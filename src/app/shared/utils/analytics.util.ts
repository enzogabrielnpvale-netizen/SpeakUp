import { CategoriaRelato, CATEGORIAS, Relato } from '../../core/models/relato.model';

export const CORES_CATEGORIA: Record<CategoriaRelato, string> = {
  Bullying: '#2aa7e0',
  Infraestrutura: '#16a34a',
  'Bem-estar': '#0f9488',
  Sugestão: '#7c3aed',
  Assédio: '#d97706',
  Outros: '#64748b',
};

const QUANTIDADE_MESES = 6;

interface MesAnalytics {
  chave: string;
  rotulo: string;
  enviados: number;
  resolvidos: number;
  porCategoria: Record<CategoriaRelato, number>;
  resolvidosPorCategoria: Record<CategoriaRelato, number>;
}

function dataValida(valor: string | undefined): Date | undefined {
  if (!valor) return undefined;
  const data = new Date(valor);
  return Number.isNaN(data.getTime()) ? undefined : data;
}

function chaveMes(data: Date): string {
  return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;
}

function variacao(atual: number, anterior: number): string {
  if (anterior === 0) {
    return atual === 0 ? 'Sem relatos no mês anterior' : `+${atual} no mês`;
  }
  const percentual = Math.round(((atual - anterior) / anterior) * 100);
  return `${percentual > 0 ? '+' : ''}${percentual}% vs mês anterior`;
}

export function calcularAnalytics(relatos: Relato[], agora = new Date()) {
  const primeiroMes = new Date(agora.getFullYear(), agora.getMonth() - QUANTIDADE_MESES + 1, 1);
  const formatadorMes = new Intl.DateTimeFormat('pt-BR', { month: 'short' });
  const meses: MesAnalytics[] = Array.from({ length: QUANTIDADE_MESES }, (_, indice) => {
    const data = new Date(primeiroMes.getFullYear(), primeiroMes.getMonth() + indice, 1);
    const porCategoria = Object.fromEntries(CATEGORIAS.map(({ valor }) => [valor, 0])) as Record<CategoriaRelato, number>;
    const resolvidosPorCategoria = Object.fromEntries(CATEGORIAS.map(({ valor }) => [valor, 0])) as Record<CategoriaRelato, number>;
    return {
      chave: chaveMes(data),
      rotulo: formatadorMes.format(data).replace('.', ''),
      enviados: 0,
      resolvidos: 0,
      porCategoria,
      resolvidosPorCategoria,
    };
  });
  const mesesPorChave = new Map(meses.map((mes) => [mes.chave, mes]));

  for (const relato of relatos) {
    const criadoEm = dataValida(relato.criadoEm);
    if (criadoEm) {
      const mesCriacao = mesesPorChave.get(chaveMes(criadoEm));
      if (mesCriacao) {
        mesCriacao.enviados++;
        mesCriacao.porCategoria[relato.categoria]++;
      }
    }

    if (relato.status === 'Resolvido') {
      const dataResolucao = dataValida(relato.atualizadoEm) ?? criadoEm;
      if (dataResolucao) {
        const mesResolucao = mesesPorChave.get(chaveMes(dataResolucao));
        if (mesResolucao) {
          mesResolucao.resolvidos++;
          mesResolucao.resolvidosPorCategoria[relato.categoria]++;
        }
      }
    }
  }

  const estatisticasPorCategoria = CATEGORIAS.map(({ valor }) => {
    const relatosDaCategoria = relatos.filter((relato) => relato.categoria === valor);
    return {
      categoria: valor,
      total: relatosDaCategoria.length,
      concluidos: relatosDaCategoria.filter((relato) => relato.status === 'Resolvido').length,
      emAndamento: relatosDaCategoria.filter((relato) => relato.status === 'Em Andamento').length,
    };
  });
  const totalRelatos = relatos.length;
  const relatosResolvidos = relatos.filter((relato) => relato.status === 'Resolvido').length;
  const resolvidosComDatas = relatos.flatMap((relato) => {
    if (relato.status !== 'Resolvido') return [];
    const criadoEm = dataValida(relato.criadoEm);
    const atualizadoEm = dataValida(relato.atualizadoEm);
    return criadoEm && atualizadoEm && atualizadoEm >= criadoEm ? [atualizadoEm.getTime() - criadoEm.getTime()] : [];
  });
  const mediaResolucaoEmDias = resolvidosComDatas.length
    ? resolvidosComDatas.reduce((soma, duracao) => soma + duracao, 0) / resolvidosComDatas.length / 86_400_000
    : undefined;
  const mesAtual = meses[meses.length - 1];
  const mesAnterior = meses[meses.length - 2];
  const categoriaMaisRelatada = [...estatisticasPorCategoria].sort((a, b) => b.total - a.total)[0];
  const categoriasComRelatos = estatisticasPorCategoria.filter((categoria) => categoria.total > 0);
  const taxas = categoriasComRelatos.map((categoria) => ({
    ...categoria,
    taxa: Math.round((categoria.concluidos / categoria.total) * 1000) / 10,
  }));
  const taxaResolucao = totalRelatos ? Math.round((relatosResolvidos / totalRelatos) * 1000) / 10 : 0;

  return {
    meses,
    estatisticasPorCategoria,
    totalRelatos,
    relatosResolvidos,
    taxaResolucao,
    mediaResolucaoEmDias,
    variacaoRelatos: variacao(mesAtual.enviados, mesAnterior.enviados),
    variacaoResolvidos: variacao(mesAtual.resolvidos, mesAnterior.resolvidos),
    categoriaMaisRelatada: categoriaMaisRelatada.total > 0 ? categoriaMaisRelatada : undefined,
    melhorTaxa: [...taxas].sort((a, b) => b.taxa - a.taxa)[0],
    piorTaxa: [...taxas].sort((a, b) => a.taxa - b.taxa)[0],
    totalGeral: totalRelatos,
  };
}
