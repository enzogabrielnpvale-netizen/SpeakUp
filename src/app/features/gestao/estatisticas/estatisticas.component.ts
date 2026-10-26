import { Component, computed, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarGestaoComponent } from '../../../shared/components/navbar/navbar-gestao.component';
import { BarChartComponent } from '../../../shared/components/charts/bar-chart.component';
import { LineChartComponent } from '../../../shared/components/charts/line-chart.component';
import { PieChartComponent } from '../../../shared/components/charts/pie-chart.component';
import { Relato, CategoriaRelato } from '../../../core/models/relato.model';
import { RelatosService } from '../../../core/services/relatos.service';
import { CORES_CATEGORIA } from '../../../shared/utils/relato-visual.util';

const CATEGORIAS: CategoriaRelato[] = ['Bullying', 'Infraestrutura', 'Bem-estar', 'Sugestão', 'Assédio', 'Outros'];
const MESES_EXIBIDOS = 6;
const MILISSEGUNDOS_POR_DIA = 24 * 60 * 60 * 1000;

interface MesRelatorio {
  ano: number;
  mes: number;
  rotulo: string;
}

interface Resolucao {
  categoria: CategoriaRelato;
  data: Date;
  duracaoDias: number;
}

function chaveMes(data: Date): string {
  return `${data.getUTCFullYear()}-${data.getUTCMonth()}`;
}

function dataValida(valor: string): Date | undefined {
  const data = new Date(valor);
  return Number.isNaN(data.getTime()) ? undefined : data;
}

function mesesRecentes(): MesRelatorio[] {
  const hoje = new Date();
  return Array.from({ length: MESES_EXIBIDOS }, (_, indice) => {
    const data = new Date(Date.UTC(hoje.getUTCFullYear(), hoje.getUTCMonth() - (MESES_EXIBIDOS - indice - 1), 1));
    const rotuloMes = new Intl.DateTimeFormat('pt-BR', { month: 'short', timeZone: 'UTC' })
      .format(data)
      .replace('.', '');
    return {
      ano: data.getUTCFullYear(),
      mes: data.getUTCMonth(),
      rotulo: `${rotuloMes}/${String(data.getUTCFullYear()).slice(-2)}`,
    };
  });
}

function obterResolucoes(relatos: Relato[]): Resolucao[] {
  return relatos.flatMap((relato) => {
    const criacao = dataValida(relato.criadoEm);
    if (!criacao) return [];

    const eventosResolucao = (relato.linhaDoTempo ?? [])
      .filter((evento) => evento.titulo === 'Status atualizado: Resolvido')
      .map((evento) => dataValida(evento.data))
      .filter((data): data is Date => data !== undefined);

    const datasResolucao =
      eventosResolucao.length > 0
        ? eventosResolucao
        : relato.status === 'Resolvido'
          ? [dataValida(relato.atualizadoEm)].filter((data): data is Date => data !== undefined)
          : [];

    return datasResolucao.map((data) => ({
      categoria: relato.categoria,
      data,
      duracaoDias: Math.max(0, (data.getTime() - criacao.getTime()) / MILISSEGUNDOS_POR_DIA),
    }));
  });
}

@Component({
  selector: 'app-estatisticas',
  standalone: true,
  imports: [RouterLink, DecimalPipe, NavbarGestaoComponent, BarChartComponent, LineChartComponent, PieChartComponent],
  templateUrl: './estatisticas.component.html',
  styleUrl: './estatisticas.component.css',
})
export class EstatisticasComponent {
  private relatosService = inject(RelatosService);
  private relatos = this.relatosService.relatos;

  meses = computed(() => mesesRecentes().map((mes) => mes.rotulo));
  private periodosMensais = computed(() => mesesRecentes());
  private resolucoes = computed(() => obterResolucoes(this.relatos()));

  kpis = computed(() => {
    const relatos = this.relatos();
    const resolucoes = this.resolucoes();
    const hoje = new Date();
    const mesAtual = chaveMes(hoje);
    const totalResolvidos = relatos.filter((relato) => relato.status === 'Resolvido').length;
    const tempoMedio =
      resolucoes.length > 0
        ? resolucoes.reduce((total, resolucao) => total + resolucao.duracaoDias, 0) / resolucoes.length
        : undefined;

    return {
      totalRelatos: relatos.length,
      totalRelatosVariacao: `${relatos.filter((relato) => {
        const data = dataValida(relato.criadoEm);
        return data !== undefined && chaveMes(data) === mesAtual;
      }).length} criados neste mês`,
      relatosResolvidos: totalResolvidos,
      relatosResolvidosVariacao: `${resolucoes.filter((resolucao) => chaveMes(resolucao.data) === mesAtual).length} concluídos neste mês`,
      taxaResolucao: relatos.length > 0 ? `${((totalResolvidos / relatos.length) * 100).toFixed(1)}%` : '0%',
      taxaResolucaoMeta: `${totalResolvidos} de ${relatos.length} relatos`,
      tempoMedio: tempoMedio === undefined ? '—' : `${tempoMedio.toFixed(1)} dias`,
      tempoMedioVariacao: `${resolucoes.length} relatos resolvidos`,
    };
  });

  categoriasNomes = CATEGORIAS;

  private relatosPorCategoria = computed(() =>
    CATEGORIAS.map((categoria) => {
      const relatos = this.relatos().filter((relato) => relato.categoria === categoria);
      return {
        categoria,
        total: relatos.length,
        concluidos: relatos.filter((relato) => relato.status === 'Resolvido').length,
        emAndamento: relatos.filter((relato) => relato.status === 'Em Andamento').length,
      };
    }),
  );

  seriesPorCategoria = computed(() => [
    { nome: 'Total', cor: '#2aa7e0', valores: this.relatosPorCategoria().map((item) => item.total) },
    { nome: 'Resolvidos', cor: '#16a34a', valores: this.relatosPorCategoria().map((item) => item.concluidos) },
  ]);

  dadosPizza = computed(() =>
    this.relatosPorCategoria().map((item) => ({
      rotulo: item.categoria,
      valor: item.total,
      cor: CORES_CATEGORIA[item.categoria],
    })),
  );

  serieResolvidosPorMes = computed(() => [
    {
      nome: 'Resolvidos',
      cor: '#2aa7e0',
      valores: this.periodosMensais().map((mes) =>
        this.resolucoes().filter((resolucao) => chaveMes(resolucao.data) === `${mes.ano}-${mes.mes}`).length,
      ),
    },
  ]);

  seriesEnviadosVsResolvidos = computed(() => [
    {
      nome: 'Enviados',
      cor: '#16a34a',
      valores: this.periodosMensais().map((mes) =>
        this.relatos().filter((relato) => {
          const data = dataValida(relato.criadoEm);
          return data !== undefined && chaveMes(data) === `${mes.ano}-${mes.mes}`;
        }).length,
      ),
    },
    {
      nome: 'Resolvidos',
      cor: '#0f9488',
      valores: this.periodosMensais().map((mes) =>
        this.resolucoes().filter((resolucao) => chaveMes(resolucao.data) === `${mes.ano}-${mes.mes}`).length,
      ),
    },
  ]);

  seriesAnaliseMensal = computed(() =>
    CATEGORIAS.map((categoria) => ({
      nome: categoria,
      cor: CORES_CATEGORIA[categoria],
      valores: this.periodosMensais().map((mes) =>
        this.resolucoes().filter(
          (resolucao) => resolucao.categoria === categoria && chaveMes(resolucao.data) === `${mes.ano}-${mes.mes}`,
        ).length,
      ),
    })),
  );

  detalhamentoMensal = computed(() =>
    this.periodosMensais().map((mes) => {
      const relatosDoMes = this.relatos().filter((relato) => {
        const data = dataValida(relato.criadoEm);
        return data !== undefined && chaveMes(data) === `${mes.ano}-${mes.mes}`;
      });
      const contagem = Object.fromEntries(
        CATEGORIAS.map((categoria) => [categoria, relatosDoMes.filter((relato) => relato.categoria === categoria).length]),
      ) as Record<CategoriaRelato, number>;

      return {
        mes: mes.rotulo,
        bullying: contagem['Bullying'],
        infraestrutura: contagem['Infraestrutura'],
        bemEstar: contagem['Bem-estar'],
        sugestao: contagem['Sugestão'],
        assedio: contagem['Assédio'],
        outros: contagem['Outros'],
        total: relatosDoMes.length,
      };
    }),
  );

  estatisticasDetalhadas = computed(() =>
    this.relatosPorCategoria().map((item) => ({
      ...item,
      taxa: item.total > 0 ? Math.round((item.concluidos / item.total) * 1000) / 10 : 0,
      cor: CORES_CATEGORIA[item.categoria],
    })),
  );

  categoriaMaisRelatada = computed(() => {
    const maior = [...this.relatosPorCategoria()].sort((a, b) => b.total - a.total)[0];
    return { rotulo: maior.total > 0 ? maior.categoria : 'Sem dados', valor: maior.total };
  });

  totalGeral = computed(() => this.relatos().length);

  private categoriasComRelatos = computed(() => this.estatisticasDetalhadas().filter((item) => item.total > 0));
  melhorTaxa = computed(
    () => [...this.categoriasComRelatos()].sort((a, b) => b.taxa - a.taxa)[0] ?? { categoria: 'Sem dados', taxa: 0 },
  );
  piorTaxa = computed(
    () => [...this.categoriasComRelatos()].sort((a, b) => a.taxa - b.taxa)[0] ?? { categoria: 'Sem dados', taxa: 0 },
  );

  exportarPdf(): void {
    window.print();
  }
}
