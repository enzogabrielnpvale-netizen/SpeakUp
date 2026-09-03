import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarGestaoComponent } from '../../../shared/components/navbar/navbar-gestao.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { DataBrPipe } from '../../../shared/pipes/data-br.pipe';
import { BarChartComponent } from '../../../shared/components/charts/bar-chart.component';
import { PieChartComponent } from '../../../shared/components/charts/pie-chart.component';
import { RelatosService } from '../../../core/services/relatos.service';
import { UsuariosService } from '../../../core/services/usuarios.service';
import { varianteCategoria, variantePrioridade } from '../../../shared/utils/relato-visual.util';
import { CORES_CATEGORIA, MESES, RELATOS_POR_CATEGORIA, RELATOS_POR_MES } from '../../../shared/data/analytics-mock';

@Component({
  selector: 'app-dashboard-gestao',
  standalone: true,
  imports: [RouterLink, NavbarGestaoComponent, StatCardComponent, BadgeComponent, DataBrPipe, BarChartComponent, PieChartComponent],
  templateUrl: './dashboard-gestao.component.html',
  styleUrl: './dashboard-gestao.component.css',
})
export class DashboardGestaoComponent {
  private relatosService = inject(RelatosService);
  private usuariosService = inject(UsuariosService);

  protected varianteCategoria = varianteCategoria;
  protected variantePrioridade = variantePrioridade;

  total = computed(() => this.relatosService.total());
  pendentes = computed(() => this.relatosService.relatos().filter((r) => r.status !== 'Resolvido').length);
  resolvidos = computed(() => this.relatosService.relatos().filter((r) => r.status === 'Resolvido').length);
  alunosAtivos = this.usuariosService.ativos;

  recentes = computed(() =>
    [...this.relatosService.relatos()].sort((a, b) => +new Date(b.criadoEm) - +new Date(a.criadoEm)).slice(0, 3),
  );

  categoriasChart = MESES;
  seriesRelatosPorMes = [
    { nome: 'Enviados', cor: '#2aa7e0', valores: RELATOS_POR_MES.enviados },
    { nome: 'Resolvidos', cor: '#16a34a', valores: RELATOS_POR_MES.resolvidos },
  ];

  dadosPizza = RELATOS_POR_CATEGORIA.map((c) => ({ rotulo: c.rotulo, valor: c.valor, cor: CORES_CATEGORIA[c.rotulo] }));
}
