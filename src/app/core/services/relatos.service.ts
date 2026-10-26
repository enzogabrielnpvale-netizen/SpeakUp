import { Injectable, computed, signal } from '@angular/core';
import { onValue, ref, set } from 'firebase/database';
import { CategoriaRelato, PrioridadeRelato, Relato, StatusRelato } from '../models/relato.model';
import { database } from '../../firebase';

const dataExemplo = new Date().toISOString();
const DADOS_INICIAIS: Relato[] = [
  {
    id: 1,
    titulo: 'Exemplo de relato',
    descricao: 'Este é um relato de exemplo com informações genéricas para demonstrar o funcionamento do sistema.',
    categoria: 'Outros',
    status: 'Recebido',
    prioridade: 'Média',
    alunoId: 0,
    alunoNome: 'Usuário de exemplo',
    criadoEm: dataExemplo,
    atualizadoEm: dataExemplo,
    linhaDoTempo: [{ titulo: 'Relato criado', data: dataExemplo }],
  },
];

@Injectable({ providedIn: 'root' })
export class RelatosService {
  private readonly _relatos = signal<Relato[]>(DADOS_INICIAIS);
  readonly relatos = this._relatos.asReadonly();

  constructor() {
    onValue(ref(database, 'relatos'), (snapshot) => {
      const dados = snapshot.val() as Record<string, Relato> | null;
      if (dados) {
        this._relatos.set(Object.values(dados).sort((a, b) => b.id - a.id));
      }
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

  criarRelato(dados: {
    titulo: string;
    descricao: string;
    categoria: CategoriaRelato;
    alunoId: number;
    alunoNome: string;
  }): Relato {
    const novo: Relato = {
      id: Math.max(0, ...this._relatos().map((r) => r.id)) + 1,
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
    this._relatos.update((lista) => [novo, ...lista]);
    void this.persistir();
    return novo;
  }

  responder(id: number, resposta: string, novoStatus: StatusRelato, prioridade?: PrioridadeRelato): void {
    this._relatos.update((lista) =>
      lista.map((r) =>
        r.id === id
          ? {
              ...r,
              respostaGestao: resposta,
              status: novoStatus,
              prioridade: prioridade ?? r.prioridade,
              atualizadoEm: new Date().toISOString(),
              linhaDoTempo: [...r.linhaDoTempo, { titulo: 'Gestão respondeu ao relato', data: new Date().toISOString() }],
            }
          : r,
      ),
    );
    void this.persistir();
  }

  atualizarPrioridade(id: number, prioridade: PrioridadeRelato): void {
    this._relatos.update((lista) =>
      lista.map((r) => (r.id === id ? { ...r, prioridade, atualizadoEm: new Date().toISOString() } : r)),
    );
    void this.persistir();
  }

  atualizarStatus(id: number, status: StatusRelato): void {
    this._relatos.update((lista) =>
      lista.map((r) => (r.id === id ? { ...r, status, atualizadoEm: new Date().toISOString() } : r)),
    );
    void this.persistir();
  }

  private async persistir(): Promise<void> {
    await set(ref(database, 'relatos'), Object.fromEntries(this._relatos().map((relato) => [relato.id, relato])));
  }
}
