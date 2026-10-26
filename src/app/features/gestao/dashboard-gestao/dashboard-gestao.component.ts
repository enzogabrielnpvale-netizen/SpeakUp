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
import { CategoriaRelato, Relato } from '../../../core/models/relato.model';
import { CORES_CATEGORIA, varianteCategoria, variantePrioridade } from '../../../shared/utils/relato-visual.util';

const CATEGORIAS: CategoriaRelato[] = ['Bullying', 'Infraestrutura', 'Bem-estar', 'Sugestão', 'Assédio', 'Outros'];
const QUANTIDADE_MESES = 6;

interface PeriodoMensal {
  ano: number;
  mes: number;
  rotulo: string;
}

function periodosRecentes(): PeriodoMensal[] {
  const hoje = new Date();
  return Array.from({ length: QUANTIDADE_MESES }, (_, indice) => {
    const data = new Date(Date.UTC(hoje.getUTCFullYear(), hoje.getUTCMonth() - (QUANTIDADE_MESES - indice - 1), 1));
    const mes = new Intl.DateTimeFormat('pt-BR', { month: 'short', timeZone: 'UTC' })
      .format(data)
      .replace('.', '');
    return { ano: data.getUTCFullYear(), mes: data.getUTCMonth(), rotulo: `${mes}/${String(data.getUTCFullYear()).slice(-2)}` };
  });
}

function dataValida(valor: string): Date | undefined {
  const data = new Date(valor);
  return Number.isNaN(data.getTime()) ? undefined : data;
}

function relatosResolvidos(relatos: Relato[]): Array<{ relato: Relato; data: Date }> {
  return relatos.flatMap((relato) => {
    const eventos = (relato.linhaDoTempo ?? [])
      .filter((evento) => evento.titulo === 'Status atualizado: Resolvido')
      .map((evento) => dataValida(evento.data))
      .filter((data): data is Date => data !== undefined);
    const datas = eventos.length
      ? eventos
      : relato.status === 'Resolvido'
        ? [dataValida(relato.atualizadoEm)].filter((data): data is Date => data !== undefined)
        : [];
    return datas.map((data) => ({ relato, data }));
  });
}

function mesmoMes(data: Date, periodo: PeriodoMensal): boolean {
  return data.getUTCFullYear() === periodo.ano && data.getUTCMonth() === periodo.mes;
}

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

  private periodos = computed(() => periodosRecentes());
  categoriasChart = computed(() => this.periodos().map((periodo) => periodo.rotulo));

  seriesRelatosPorMes = computed(() => {
    const relatos = this.relatosService.relatos();
    const resolvidos = relatosResolvidos(relatos);
    return [
      {
        nome: 'Enviados',
        cor: '#2aa7e0',
        valores: this.periodos().map(
          (periodo) => relatos.filter((relato) => {
            const data = dataValida(relato.criadoEm);
            return data !== undefined && mesmoMes(data, periodo);
          }).length,
        ),
      },
      {
        nome: 'Resolvidos',
        cor: '#16a34a',
        valores: this.periodos().map((periodo) => resolvidos.filter((item) => mesmoMes(item.data, periodo)).length),
      },
    ];
  });

  dadosPizza = computed(() =>
    CATEGORIAS.map((categoria) => ({
      rotulo: categoria,
      valor: this.relatosService.relatos().filter((relato) => relato.categoria === categoria).length,
      cor: CORES_CATEGORIA[categoria],
    })),
  );
}
