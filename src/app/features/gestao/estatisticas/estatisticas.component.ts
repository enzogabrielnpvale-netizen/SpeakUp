import { Component, computed, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarGestaoComponent } from '../../../shared/components/navbar/navbar-gestao.component';
import { BarChartComponent } from '../../../shared/components/charts/bar-chart.component';
import { LineChartComponent } from '../../../shared/components/charts/line-chart.component';
import { PieChartComponent } from '../../../shared/components/charts/pie-chart.component';
import { RelatosService } from '../../../core/services/relatos.service';
import { CORES_CATEGORIA, calcularAnalytics } from '../../../shared/utils/analytics.util';

@Component({
  selector: 'app-estatisticas',
  standalone: true,
  imports: [RouterLink, DecimalPipe, NavbarGestaoComponent, BarChartComponent, LineChartComponent, PieChartComponent],
  templateUrl: './estatisticas.component.html',
  styleUrl: './estatisticas.component.css',
})
export class EstatisticasComponent {
  private readonly relatosService = inject(RelatosService);
  private readonly analytics = computed(() => calcularAnalytics(this.relatosService.relatos()));

  kpis = computed(() => {
    const dados = this.analytics();
    return {
      totalRelatos: dados.totalRelatos,
      totalRelatosVariacao: dados.variacaoRelatos,
      relatosResolvidos: dados.relatosResolvidos,
      relatosResolvidosVariacao: dados.variacaoResolvidos,
      taxaResolucao: `${dados.taxaResolucao}%`,
      taxaResolucaoMeta: `${dados.relatosResolvidos} de ${dados.totalRelatos} relatos`,
      tempoMedio: dados.mediaResolucaoEmDias === undefined ? 'Sem dados' : `${dados.mediaResolucaoEmDias.toFixed(1)} dias`,
      tempoMedioVariacao: 'Entre criação e última atualização',
    };
  });

  meses = computed(() => this.analytics().meses.map((mes) => mes.rotulo));
  categoriasNomes = computed(() => this.analytics().estatisticasPorCategoria.map((categoria) => categoria.categoria));

  seriesPorCategoria = computed(() => {
    const categorias = this.analytics().estatisticasPorCategoria;
    return [
      { nome: 'Total', cor: '#2aa7e0', valores: categorias.map((categoria) => categoria.total) },
      { nome: 'Resolvidos', cor: '#16a34a', valores: categorias.map((categoria) => categoria.concluidos) },
    ];
  });

  dadosPizza = computed(() =>
    this.analytics().estatisticasPorCategoria.map((categoria) => ({
      rotulo: categoria.categoria,
      valor: categoria.total,
      cor: CORES_CATEGORIA[categoria.categoria],
    })),
  );

  serieResolvidosPorMes = computed(() => [
    { nome: 'Resolvidos', cor: '#2aa7e0', valores: this.analytics().meses.map((mes) => mes.resolvidos) },
  ]);

  seriesEnviadosVsResolvidos = computed(() => [
    { nome: 'Enviados', cor: '#16a34a', valores: this.analytics().meses.map((mes) => mes.enviados) },
    { nome: 'Resolvidos', cor: '#0f9488', valores: this.analytics().meses.map((mes) => mes.resolvidos) },
  ]);

  seriesAnaliseMensal = computed(() =>
    this.analytics().estatisticasPorCategoria.map((categoria) => ({
      nome: categoria.categoria,
      cor: CORES_CATEGORIA[categoria.categoria],
      valores: this.analytics().meses.map((mes) => mes.porCategoria[categoria.categoria]),
    })),
  );

  seriesResolucaoMensalPorCategoria = computed(() =>
    this.analytics().estatisticasPorCategoria.map((categoria) => ({
      nome: categoria.categoria,
      cor: CORES_CATEGORIA[categoria.categoria],
      valores: this.analytics().meses.map((mes) => mes.resolvidosPorCategoria[categoria.categoria]),
    })),
  );

  detalhamentoMensal = computed(() =>
    this.analytics().meses.map((mes) => ({
      mes: mes.rotulo,
      bullying: mes.porCategoria.Bullying,
      infraestrutura: mes.porCategoria.Infraestrutura,
      bemEstar: mes.porCategoria['Bem-estar'],
      sugestao: mes.porCategoria.Sugestão,
      assedio: mes.porCategoria.Assédio,
      outros: mes.porCategoria.Outros,
      total: mes.enviados,
    })),
  );

  estatisticasDetalhadas = computed(() =>
    this.analytics().estatisticasPorCategoria.map((categoria) => ({
      ...categoria,
      taxa: categoria.total ? Math.round((categoria.concluidos / categoria.total) * 1000) / 10 : 0,
      cor: CORES_CATEGORIA[categoria.categoria],
    })),
  );

  categoriaMaisRelatada = computed(
    () => this.analytics().categoriaMaisRelatada ?? { categoria: 'Sem dados', total: 0 },
  );
  melhorTaxa = computed(() => this.analytics().melhorTaxa ?? { categoria: 'Sem dados', taxa: 0 });
  piorTaxa = computed(() => this.analytics().piorTaxa ?? { categoria: 'Sem dados', taxa: 0 });
  totalGeral = computed(() => this.analytics().totalGeral);

  exportarPdf(): void {
    window.print();
  }
}
