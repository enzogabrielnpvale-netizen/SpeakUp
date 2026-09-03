export type CategoriaRelato =
  | 'Bullying'
  | 'Infraestrutura'
  | 'Bem-estar'
  | 'Sugestão'
  | 'Assédio'
  | 'Outros';

export type StatusRelato = 'Recebido' | 'Em Análise' | 'Em Andamento' | 'Resolvido';

export type PrioridadeRelato = 'Baixa' | 'Média' | 'Alta' | 'Urgente';

export interface EventoLinhaDoTempo {
  titulo: string;
  data: string; // ISO
}

export interface Relato {
  id: number;
  titulo: string;
  descricao: string;
  categoria: CategoriaRelato;
  status: StatusRelato;
  prioridade: PrioridadeRelato;
  alunoId: number;
  alunoNome: string;
  criadoEm: string; // ISO
  atualizadoEm: string; // ISO
  respostaGestao?: string;
  linhaDoTempo: EventoLinhaDoTempo[];
}

export interface CategoriaInfo {
  valor: CategoriaRelato;
  descricao: string;
}

export const CATEGORIAS: CategoriaInfo[] = [
  { valor: 'Bullying', descricao: 'Situações de intimidação ou agressão' },
  { valor: 'Infraestrutura', descricao: 'Problemas com instalações escolares' },
  { valor: 'Bem-estar', descricao: 'Questões relacionadas à saúde e bem-estar' },
  { valor: 'Sugestão', descricao: 'Ideias para melhorar a escola' },
  { valor: 'Assédio', descricao: 'Denúncias de assédio' },
  { valor: 'Outros', descricao: 'Outras questões' },
];
