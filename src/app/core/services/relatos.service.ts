import { Injectable, computed, signal } from '@angular/core';
import { onValue, ref, set } from 'firebase/database';
import { CategoriaRelato, PrioridadeRelato, Relato, StatusRelato } from '../models/relato.model';
import { database } from '../../firebase';

@Injectable({ providedIn: 'root' })
export class RelatosService {
  private readonly _relatos = signal<Relato[]>([]);
  readonly relatos = this._relatos.asReadonly();
  readonly erroSincronizacao = signal<string | null>(null);

  constructor() {
    onValue(ref(database, 'relatos'), (snapshot) => {
      const dados = snapshot.val() as Record<string, Relato> | null;
      this._relatos.set(Object.values(dados ?? {}).sort((a, b) => b.id - a.id));
      this.erroSincronizacao.set(null);
    }, (error) => {
      console.error('Erro ao carregar relatos:', error);
      this.erroSincronizacao.set(error.message);
    });
  }

  readonly total = computed(() => this._relatos().length);

  relatosPorAluno(alunoId: number) {
    return computed(() => this._relatos().filter((r) => r.alunoId === alunoId));
  }

  porId(id: number): Relato | undefined {
    return this._relatos().find((r) => r.id === id);
  }

  contarPorStatus(status: StatusRelato, lista?: Relato[]): number {
    return (lista ?? this._relatos()).filter((r) => r.status === status).length;
  }

  contarPorCategoria(categoria: CategoriaRelato, lista?: Relato[]): number {
    return (lista ?? this._relatos()).filter((r) => r.categoria === categoria).length;
  }

  async criarRelato(dados: {
    titulo: string;
    descricao: string;
    categoria: CategoriaRelato;
    alunoId: number;
    alunoNome: string;
  }): Promise<Relato> {
    const novo: Relato = {
      id: Math.max(Date.now(), ...this._relatos().map((r) => r.id + 1)),
      titulo: dados.titulo,
      descricao: dados.descricao,
      categoria: dados.categoria,
      status: 'Recebido',
      prioridade: 'Média',
      alunoId: dados.alunoId,
      alunoNome: dados.alunoNome,
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString(),
      linhaDoTempo: [{ titulo: 'Relato criado', data: new Date().toISOString() }],
    };
    await set(ref(database, `relatos/${novo.id}`), novo);
    this._relatos.update((lista) =>
      lista.some((relato) => relato.id === novo.id) ? lista : [novo, ...lista],
    );
    return novo;
  }

  async responder(id: number, resposta: string, novoStatus: StatusRelato, prioridade?: PrioridadeRelato): Promise<void> {
    const relato = this.obterRelatoOuFalhar(id);
    const agora = new Date().toISOString();
    await this.salvarRelato({
      ...relato,
      respostaGestao: resposta,
      status: novoStatus,
      prioridade: prioridade ?? relato.prioridade,
      atualizadoEm: agora,
      linhaDoTempo: [
        ...(relato.linhaDoTempo ?? []),
        ...(relato.status !== novoStatus ? [{ titulo: `Status atualizado: ${novoStatus}`, data: agora }] : []),
        { titulo: 'Gestão respondeu ao relato', data: agora },
      ],
    });
  }

  atualizarPrioridade(id: number, prioridade: PrioridadeRelato): void {
    this._relatos.update((lista) =>
      lista.map((r) => (r.id === id ? { ...r, prioridade, atualizadoEm: new Date().toISOString() } : r)),
    );
    void this.persistir();
  }

  async atualizarStatus(id: number, status: StatusRelato): Promise<void> {
    const relato = this.obterRelatoOuFalhar(id);
    const agora = new Date().toISOString();
    await this.salvarRelato({
      ...relato,
      status,
      atualizadoEm: agora,
      linhaDoTempo: [
        ...(relato.linhaDoTempo ?? []),
        ...(relato.status !== status ? [{ titulo: `Status atualizado: ${status}`, data: agora }] : []),
      ],
    });
  }

  private obterRelatoOuFalhar(id: number): Relato {
    const relato = this._relatos().find((item) => item.id === id);
    if (!relato) {
      throw new Error(`Relato ${id} não encontrado.`);
    }
    return relato;
  }

  private async salvarRelato(relato: Relato): Promise<void> {
    await set(ref(database, `relatos/${relato.id}`), relato);
    this._relatos.update((lista) => lista.map((item) => item.id === relato.id ? relato : item));
  }

  private async persistir(): Promise<void> {
    await set(ref(database, 'relatos'), Object.fromEntries(this._relatos().map((relato) => [relato.id, relato])));
  }
}
