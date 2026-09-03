export const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];

export const CORES_CATEGORIA: Record<string, string> = {
  'Bullying': '#2aa7e0',
  'Infraestrutura': '#16a34a',
  'Bem-estar': '#0f9488',
  'Sugestão': '#7c3aed',
  'Assédio': '#d97706',
  'Outros': '#64748b',
};

export const RELATOS_POR_MES = {
  enviados: [45, 51, 47, 61, 55, 35],
  resolvidos: [38, 44, 41, 52, 47, 30],
};

export const RELATOS_POR_CATEGORIA = [
  { rotulo: 'Bullying', valor: 45 },
  { rotulo: 'Infraestrutura', valor: 30 },
  { rotulo: 'Bem-estar', valor: 25 },
  { rotulo: 'Sugestão', valor: 20 },
  { rotulo: 'Assédio', valor: 15 },
  { rotulo: 'Outros', valor: 10 },
];

export const RESOLVIDOS_POR_MES = [42, 48, 50, 58, 59, 26];

export const DETALHAMENTO_MENSAL = [
  { mes: 'Jan', bullying: 5, infraestrutura: 8, bemEstar: 3, sugestao: 4, assedio: 2, outros: 1 },
  { mes: 'Fev', bullying: 7, infraestrutura: 4, bemEstar: 6, sugestao: 3, assedio: 3, outros: 2 },
  { mes: 'Mar', bullying: 6, infraestrutura: 5, bemEstar: 4, sugestao: 5, assedio: 2, outros: 1 },
  { mes: 'Abr', bullying: 8, infraestrutura: 6, bemEstar: 5, sugestao: 4, assedio: 3, outros: 2 },
  { mes: 'Mai', bullying: 9, infraestrutura: 4, bemEstar: 3, sugestao: 2, assedio: 1, outros: 2 },
  { mes: 'Jun', bullying: 3, infraestrutura: 1, bemEstar: 1, sugestao: 1, assedio: 1, outros: 1 },
];

export const ESTATISTICAS_DETALHADAS = [
  { categoria: 'Bullying', total: 45, concluidos: 38, emAndamento: 7 },
  { categoria: 'Infraestrutura', total: 30, concluidos: 28, emAndamento: 2 },
  { categoria: 'Bem-estar', total: 25, concluidos: 22, emAndamento: 3 },
  { categoria: 'Sugestão', total: 20, concluidos: 19, emAndamento: 1 },
  { categoria: 'Assédio', total: 15, concluidos: 12, emAndamento: 3 },
  { categoria: 'Outros', total: 10, concluidos: 9, emAndamento: 1 },
];

export const KPIS_GERAIS = {
  totalRelatos: 145,
  totalRelatosVariacao: '+12% vs mês anterior',
  relatosResolvidos: 122,
  relatosResolvidosVariacao: '+8% vs mês anterior',
  taxaResolucao: '84.1%',
  taxaResolucaoMeta: 'Meta 85%',
  tempoMedio: '3.2d',
  tempoMedioVariacao: 'Melhorou 15%',
};
