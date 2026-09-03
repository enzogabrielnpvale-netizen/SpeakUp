export type SerieEscolar = '7° Ano' | '8° Ano' | '9° Ano' | '1° EM' | '2° EM' | '3° EM';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  matricula: string;
  serie: SerieEscolar;
  status: 'Ativo' | 'Inativo';
  ultimoAcesso: string; // ISO
}
