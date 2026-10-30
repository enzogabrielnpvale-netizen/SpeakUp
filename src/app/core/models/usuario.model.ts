export const SERIES_ESCOLARES = ['1° EM', '2° EM', '3° EM'] as const;
export type SerieEscolar = (typeof SERIES_ESCOLARES)[number];

export function ehSerieEscolar(value: unknown): value is SerieEscolar {
  return typeof value === 'string' && (SERIES_ESCOLARES as readonly string[]).includes(value);
}

export interface Usuario {
  id: number;
  uid?: string;
  nome: string;
  email: string;
  serie: SerieEscolar;
  status: 'Ativo' | 'Inativo';
  ultimoAcesso: string; // ISO
  papel?: string;
}

export function ehUsuarioGestao(usuario: Pick<Usuario, 'papel'>): boolean {
  return (
    typeof usuario.papel === 'string' &&
    usuario.papel.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase() === 'gestao'
  );
}
