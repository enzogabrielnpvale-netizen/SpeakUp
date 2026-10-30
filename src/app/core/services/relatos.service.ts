import { Injectable, computed, inject, signal } from '@angular/core';
import { equalTo, onValue, orderByChild, push, query, ref, set, update } from 'firebase/database';
import { CategoriaRelato, PrioridadeRelato, Relato, StatusRelato } from '../models/relato.model';
import { database } from '../../firebase';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class RelatosService {
  private readonly auth = inject(AuthService);
  private readonly _relatos = signal<Relato[]>([]);
  readonly relatos = this._relatos.asReadonly();

  constructor() {
    const usuario = this.auth.usuario();
    if (!usuario) return;

    if (usuario.papel === 'aluno' && !usuario.uid) {
      console.error('Não foi possível carregar os relatos: sessão do aluno sem UID.');
      return;
    }

    const relatosRef = ref(database, 'relatos');
    const relatosQuery =
      usuario.papel === 'gestao'
        ? relatosRef
        : query(relatosRef, orderByChild('alunoUid'), equalTo(usuario.uid));

    onValue(
      relatosQuery,
      (snapshot) => {
        const dados = snapshot.val() as Record<string, Relato> | null;
        const relatos = dados
          ? Object.entries(dados).map(([key, relato]) => ({ ...relato, id: String(relato.id ?? key) }))
          : [];
        this._relatos.set(relatos.sort((a, b) => b.criadoEm.localeCompare(a.criadoEm)));
      },
      (error) => console.error('Erro ao carregar relatos:', error),
    );
  }

  readonly total = computed(() => this._relatos().length);

  relatosPorAluno(alunoId: number) {
    return computed(() => this._relatos().filter((r) => r.alunoId === alunoId));
  }

  porId(id: string): Relato | undefined {
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
    alunoUid: string;
    alunoNome: string;
  }): Promise<Relato> {
    const id = push(ref(database, 'relatos')).key;
    if (!id) throw new Error('Não foi possível gerar um identificador para o relato.');

    const agora = new Date().toISOString();
    const novo: Relato = {
      id,
      titulo: dados.titulo,
      descricao: dados.descricao,
      categoria: dados.categoria,
      status: 'Recebido',
      prioridade: 'Média',
      alunoId: dados.alunoId,
      alunoUid: dados.alunoUid,
      alunoNome: dados.alunoNome,
      criadoEm: agora,
      atualizadoEm: agora,
      linhaDoTempo: [{ titulo: 'Relato criado', data: agora }],
    };
    await this.persistir(novo);
    this._relatos.update((lista) => [novo, ...lista.filter((relato) => relato.id !== novo.id)]);
    return novo;
  }

  responder(id: string, resposta: string, novoStatus: StatusRelato): void {
    const relato = this.porId(id);
    if (!relato) return;

    const agora = new Date().toISOString();
    const atualizado: Relato = {
      ...relato,
      respostaGestao: resposta,
      status: novoStatus,
      atualizadoEm: agora,
      linhaDoTempo: [...relato.linhaDoTempo, { titulo: 'Gestão respondeu ao relato', data: agora }],
    };
    this._relatos.update((lista) => lista.map((r) => (r.id === id ? atualizado : r)));
    void this.persistir(atualizado).catch((error) => console.error('Erro ao atualizar relato:', error));
  }

  async atualizarPrioridade(id: string, prioridade: PrioridadeRelato): Promise<void> {
    if (this.auth.usuario()?.papel !== 'gestao') {
      throw new Error('Somente usuários da gestão podem alterar a prioridade do relato.');
    }

    const relato = this.porId(id);
    if (!relato) throw new Error('Relato não encontrado para atualizar a prioridade.');

    const atualizadoEm = new Date().toISOString();
    await update(ref(database, `relatos/${id}`), { prioridade, atualizadoEm });
    this._relatos.update((lista) =>
      lista.map((item) => (item.id === id ? { ...item, prioridade, atualizadoEm } : item)),
    );
  }

  atualizarStatus(id: string, status: StatusRelato): void {
    const relato = this.porId(id);
    if (!relato) return;

    const atualizado = { ...relato, status, atualizadoEm: new Date().toISOString() };
    this._relatos.update((lista) => lista.map((r) => (r.id === id ? atualizado : r)));
    void this.persistir(atualizado).catch((error) => console.error('Erro ao atualizar relato:', error));
  }

  private async persistir(relato: Relato): Promise<void> {
    await set(ref(database, `relatos/${relato.id}`), relato);
  }
}
