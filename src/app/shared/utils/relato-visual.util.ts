import { CategoriaRelato, PrioridadeRelato, StatusRelato } from '../../core/models/relato.model';

export type VarianteBadge =
  | 'blue' | 'green' | 'red' | 'amber' | 'purple' | 'pink' | 'gray' | 'teal';

const CATEGORIA_VARIANTE: Record<CategoriaRelato, VarianteBadge> = {
  'Bullying': 'red',
  'Infraestrutura': 'blue',
  'Bem-estar': 'teal',
  'Sugestão': 'purple',
  'Assédio': 'amber',
  'Outros': 'gray',
};

const STATUS_VARIANTE: Record<StatusRelato, VarianteBadge> = {
  'Recebido': 'gray',
  'Em Análise': 'purple',
  'Em Andamento': 'blue',
  'Resolvido': 'green',
};

const PRIORIDADE_VARIANTE: Record<PrioridadeRelato, VarianteBadge> = {
  'Baixa': 'gray',
  'Média': 'blue',
  'Alta': 'amber',
  'Urgente': 'red',
};

export function varianteCategoria(c: CategoriaRelato): VarianteBadge {
  return CATEGORIA_VARIANTE[c];
}
export function varianteStatus(s: StatusRelato): VarianteBadge {
  return STATUS_VARIANTE[s];
}
export function variantePrioridade(p: PrioridadeRelato): VarianteBadge {
  return PRIORIDADE_VARIANTE[p];
}
