import { Injectable, computed, signal } from '@angular/core';
import { onValue, ref, set } from 'firebase/database';
import { CategoriaRelato, PrioridadeRelato, Relato, StatusRelato } from '../models/relato.model';
import { database } from '../../firebase';

function isoAtras(diasAtras: number, hora = '10:00:00'): string {
  const d = new Date();
  d.setDate(d.getDate() - diasAtras);
  return `${d.toISOString().slice(0, 10)}T${hora}`;
}

const DADOS_INICIAIS: Relato[] = [
  {
    id: 1,
    titulo: 'Situação urgente na sala 201',
    descricao:
      'Estou sofrendo bullying constante de alguns colegas durante as aulas. Eles fazem comentários maldosos e me excluem das atividades em grupo. Isso está afetando muito meu desempenho e vontade de ir à escola.',
    categoria: 'Bullying',
    status: 'Em Andamento',
    prioridade: 'Urgente',
    alunoId: 1,
    alunoNome: 'João Silva',
    criadoEm: isoAtras(3, '21:00:00'),
    atualizadoEm: isoAtras(2, '21:00:00'),
    respostaGestao:
      'Recebemos seu relato e já estamos tomando as providências necessárias. A coordenação pedagógica foi informada e iremos conversar com os alunos envolvidos.',
    linhaDoTempo: [
      { titulo: 'Relato criado', data: isoAtras(3, '10:30:00') },
      { titulo: 'Em análise pela coordenação', data: isoAtras(3, '14:15:00') },
      { titulo: 'Gestão respondeu ao relato', data: isoAtras(2, '09:00:00') },
    ],
  },
  {
    id: 2,
    titulo: 'Denúncia de assédio',
    descricao: 'Relato de uma situação de assédio ocorrida nas dependências da escola.',
    categoria: 'Assédio',
    status: 'Em Análise',
    prioridade: 'Alta',
    alunoId: 2,
    alunoNome: 'Maria Santos',
    criadoEm: isoAtras(4),
    atualizadoEm: isoAtras(4),
    linhaDoTempo: [{ titulo: 'Relato criado', data: isoAtras(4, '09:10:00') }],
  },
  {
    id: 3,
    titulo: 'Problema no banheiro do 2º andar',
    descricao: 'A descarga do banheiro masculino do 2º andar está quebrada há uma semana.',
    categoria: 'Infraestrutura',
    status: 'Resolvido',
    prioridade: 'Média',
    alunoId: 1,
    alunoNome: 'João Silva',
    criadoEm: isoAtras(11),
    atualizadoEm: isoAtras(9),
    respostaGestao: 'Manutenção realizada. Obrigado por reportar!',
    linhaDoTempo: [
      { titulo: 'Relato criado', data: isoAtras(11, '08:20:00') },
      { titulo: 'Gestão respondeu ao relato', data: isoAtras(9, '16:00:00') },
    ],
  },
  {
    id: 4,
    titulo: 'Solicitação de apoio psicológico',
    descricao: 'Gostaria de agendar um horário com a psicóloga escolar.',
    categoria: 'Bem-estar',
    status: 'Resolvido',
    prioridade: 'Alta',
    alunoId: 4,
    alunoNome: 'Ana Lima',
    criadoEm: isoAtras(20),
    atualizadoEm: isoAtras(18),
    respostaGestao: 'Encaminhado ao setor de apoio psicopedagógico. Entraremos em contato.',
    linhaDoTempo: [
      { titulo: 'Relato criado', data: isoAtras(20, '09:00:00') },
      { titulo: 'Gestão respondeu ao relato', data: isoAtras(18, '11:30:00') },
    ],
  },
  {
    id: 5,
    titulo: 'Sugestão para biblioteca',
    descricao: 'Poderíamos ter um horário estendido de funcionamento da biblioteca durante provas.',
    categoria: 'Sugestão',
    status: 'Em Análise',
    prioridade: 'Baixa',
    alunoId: 1,
    alunoNome: 'João Silva',
    criadoEm: isoAtras(16),
    atualizadoEm: isoAtras(16),
    linhaDoTempo: [{ titulo: 'Relato criado', data: isoAtras(16, '13:45:00') }],
  },
  {
    id: 6,
    titulo: 'Sugestão para a cantina',
    descricao: 'Adicionar opções vegetarianas no cardápio da cantina.',
    categoria: 'Sugestão',
    status: 'Resolvido',
    prioridade: 'Baixa',
    alunoId: 5,
    alunoNome: 'Carlos Souza',
    criadoEm: isoAtras(6),
    atualizadoEm: isoAtras(5),
    respostaGestao: 'Sugestão acatada e repassada à nutricionista responsável.',
    linhaDoTempo: [
      { titulo: 'Relato criado', data: isoAtras(6, '12:00:00') },
      { titulo: 'Gestão respondeu ao relato', data: isoAtras(5, '10:00:00') },
    ],
  },
  {
    id: 7,
    titulo: 'Bullying no intervalo',
    descricao: 'Presenciei um colega sendo intimidado por um grupo durante o intervalo.',
    categoria: 'Bullying',
    status: 'Em Análise',
    prioridade: 'Alta',
    alunoId: 6,
    alunoNome: 'Beatriz Oliveira',
    criadoEm: isoAtras(7),
    atualizadoEm: isoAtras(7),
    linhaDoTempo: [{ titulo: 'Relato criado', data: isoAtras(7, '15:20:00') }],
  },
  {
    id: 8,
    titulo: 'Problema na quadra de esportes',
    descricao: 'A rede da quadra de vôlei está rasgada e o piso apresenta rachaduras.',
    categoria: 'Infraestrutura',
    status: 'Resolvido',
    prioridade: 'Alta',
    alunoId: 1,
    alunoNome: 'João Silva',
    criadoEm: isoAtras(26),
    atualizadoEm: isoAtras(24),
    respostaGestao: 'Reparo agendado e concluído pela equipe de manutenção.',
    linhaDoTempo: [
      { titulo: 'Relato criado', data: isoAtras(26, '08:00:00') },
      { titulo: 'Gestão respondeu ao relato', data: isoAtras(24, '17:00:00') },
    ],
  },
  {
    id: 9,
    titulo: 'Ar condicionado quebrado',
    descricao: 'O ar condicionado da sala 305 não funciona há dias, dificultando as aulas.',
    categoria: 'Infraestrutura',
    status: 'Resolvido',
    prioridade: 'Média',
    alunoId: 7,
    alunoNome: 'Rafael Mendes',
    criadoEm: isoAtras(8),
    atualizadoEm: isoAtras(6),
    respostaGestao: 'Equipamento substituído.',
    linhaDoTempo: [
      { titulo: 'Relato criado', data: isoAtras(8, '10:00:00') },
      { titulo: 'Gestão respondeu ao relato', data: isoAtras(6, '09:00:00') },
    ],
  },
  {
    id: 10,
    titulo: 'Dúvida sobre horários',
    descricao: 'Gostaria de entender melhor a grade de horários do próximo semestre.',
    categoria: 'Outros',
    status: 'Em Andamento',
    prioridade: 'Baixa',
    alunoId: 8,
    alunoNome: 'Juliana Ferreira',
    criadoEm: isoAtras(9),
    atualizadoEm: isoAtras(9),
    linhaDoTempo: [{ titulo: 'Relato criado', data: isoAtras(9, '11:00:00') }],
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
