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
import { CORES_CATEGORIA, calcularAnalytics } from '../../../shared/utils/analytics.util';

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
  private analytics = computed(() => calcularAnalytics(this.relatosService.relatos()));

  protected varianteCategoria = varianteCategoria;
  protected variantePrioridade = variantePrioridade;

  total = computed(() => this.relatosService.total());
  pendentes = computed(() => this.relatosService.relatos().filter((r) => r.status !== 'Resolvido').length);
  resolvidos = computed(() => this.relatosService.relatos().filter((r) => r.status === 'Resolvido').length);
  alunosAtivos = computed(() => {
    if (this.usuariosService.carregando()) return 'Carregando...';
    if (this.usuariosService.erroAoCarregar()) return 'Indisponível';
    return this.usuariosService.ativos();
  });
  legendaAlunosAtivos = computed(() => {
    if (this.usuariosService.carregando()) return 'Buscando dados no Firebase';
    if (this.usuariosService.erroAoCarregar()) return 'Erro ao carregar usuários';
    return 'Alunos cadastrados';
  });

  recentes = computed(() =>
    [...this.relatosService.relatos()].sort((a, b) => +new Date(b.criadoEm) - +new Date(a.criadoEm)).slice(0, 3),
  );

  categoriasChart = computed(() => this.analytics().meses.map((mes) => mes.rotulo));
  seriesRelatosPorMes = computed(() => [
    { nome: 'Enviados', cor: '#2aa7e0', valores: this.analytics().meses.map((mes) => mes.enviados) },
    { nome: 'Resolvidos', cor: '#16a34a', valores: this.analytics().meses.map((mes) => mes.resolvidos) },
  ]);

  dadosPizza = computed(() =>
    this.analytics().estatisticasPorCategoria.map((categoria) => ({
      rotulo: categoria.categoria,
      valor: categoria.total,
      cor: CORES_CATEGORIA[categoria.categoria],
    })),
  );
}
