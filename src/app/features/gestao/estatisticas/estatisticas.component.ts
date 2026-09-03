import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarGestaoComponent } from '../../../shared/components/navbar/navbar-gestao.component';
import { BarChartComponent } from '../../../shared/components/charts/bar-chart.component';
import { LineChartComponent } from '../../../shared/components/charts/line-chart.component';
import { PieChartComponent } from '../../../shared/components/charts/pie-chart.component';
import {
  CORES_CATEGORIA,
  DETALHAMENTO_MENSAL,
  ESTATISTICAS_DETALHADAS,
  KPIS_GERAIS,
  MESES,
  RELATOS_POR_CATEGORIA,
  RELATOS_POR_MES,
  RESOLVIDOS_POR_MES,
} from '../../../shared/data/analytics-mock';

@Component({
  selector: 'app-estatisticas',
  standalone: true,
  imports: [RouterLink, DecimalPipe, NavbarGestaoComponent, BarChartComponent, LineChartComponent, PieChartComponent],
  templateUrl: './estatisticas.component.html',
  styleUrl: './estatisticas.component.css',
})
export class EstatisticasComponent {
  kpis = KPIS_GERAIS;
  meses = MESES;

  categoriasNomes = RELATOS_POR_CATEGORIA.map((c) => c.rotulo);

  seriesPorCategoria = [
    { nome: 'Total', cor: '#2aa7e0', valores: RELATOS_POR_CATEGORIA.map((c) => c.valor) },
    { nome: 'Resolvidos', cor: '#16a34a', valores: ESTATISTICAS_DETALHADAS.map((c) => c.concluidos) },
  ];

  dadosPizza = RELATOS_POR_CATEGORIA.map((c) => ({ rotulo: c.rotulo, valor: c.valor, cor: CORES_CATEGORIA[c.rotulo] }));

  serieResolvidosPorMes = [{ nome: 'Resolvidos', cor: '#2aa7e0', valores: RESOLVIDOS_POR_MES }];

  seriesEnviadosVsResolvidos = [
    { nome: 'Enviados', cor: '#16a34a', valores: RELATOS_POR_MES.enviados },
    { nome: 'Resolvidos', cor: '#0f9488', valores: RELATOS_POR_MES.resolvidos },
  ];

  seriesAnaliseMensal = [
    { nome: 'Bullying', cor: CORES_CATEGORIA['Bullying'], valores: DETALHAMENTO_MENSAL.map((m) => m.bullying) },
    { nome: 'Infraestrutura', cor: CORES_CATEGORIA['Infraestrutura'], valores: DETALHAMENTO_MENSAL.map((m) => m.infraestrutura) },
    { nome: 'Bem-estar', cor: CORES_CATEGORIA['Bem-estar'], valores: DETALHAMENTO_MENSAL.map((m) => m.bemEstar) },
    { nome: 'Sugestão', cor: CORES_CATEGORIA['Sugestão'], valores: DETALHAMENTO_MENSAL.map((m) => m.sugestao) },
    { nome: 'Assédio', cor: CORES_CATEGORIA['Assédio'], valores: DETALHAMENTO_MENSAL.map((m) => m.assedio) },
    { nome: 'Outros', cor: CORES_CATEGORIA['Outros'], valores: DETALHAMENTO_MENSAL.map((m) => m.outros) },
  ];

  detalhamentoMensal = DETALHAMENTO_MENSAL.map((m) => ({
    ...m,
    total: m.bullying + m.infraestrutura + m.bemEstar + m.sugestao + m.assedio + m.outros,
  }));

  estatisticasDetalhadas = ESTATISTICAS_DETALHADAS.map((e) => ({
    ...e,
    taxa: Math.round((e.concluidos / e.total) * 1000) / 10,
    cor: CORES_CATEGORIA[e.categoria],
  }));

  categoriaMaisRelatada = [...RELATOS_POR_CATEGORIA].sort((a, b) => b.valor - a.valor)[0];
  totalGeral = RELATOS_POR_CATEGORIA.reduce((soma, c) => soma + c.valor, 0);

  melhorTaxa = [...this.estatisticasDetalhadas].sort((a, b) => b.taxa - a.taxa)[0];
  piorTaxa = [...this.estatisticasDetalhadas].sort((a, b) => a.taxa - b.taxa)[0];

  exportarPdf(): void {
    window.print();
  }
}
