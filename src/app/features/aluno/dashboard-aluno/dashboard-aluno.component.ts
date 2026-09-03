import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarAlunoComponent } from '../../../shared/components/navbar/navbar-aluno.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { DataBrPipe } from '../../../shared/pipes/data-br.pipe';
import { AuthService } from '../../../core/services/auth.service';
import { RelatosService } from '../../../core/services/relatos.service';
import { varianteCategoria, varianteStatus } from '../../../shared/utils/relato-visual.util';

@Component({
  selector: 'app-dashboard-aluno',
  standalone: true,
  imports: [RouterLink, NavbarAlunoComponent, StatCardComponent, BadgeComponent, DataBrPipe],
  templateUrl: './dashboard-aluno.component.html',
  styleUrl: './dashboard-aluno.component.css',
})
export class DashboardAlunoComponent {
  private auth = inject(AuthService);
  private relatosService = inject(RelatosService);

  protected varianteCategoria = varianteCategoria;
  protected varianteStatus = varianteStatus;

  usuario = this.auth.usuario;

  private meusRelatos = computed(() => {
    const id = this.usuario()?.id ?? 0;
    return this.relatosService.relatos().filter((r) => r.alunoId === id);
  });

  total = computed(() => this.meusRelatos().length);
  emAndamento = computed(() => this.meusRelatos().filter((r) => r.status === 'Em Andamento').length);
  resolvidos = computed(() => this.meusRelatos().filter((r) => r.status === 'Resolvido').length);
  emAnalise = computed(() => this.meusRelatos().filter((r) => r.status === 'Em Análise' || r.status === 'Recebido').length);

  recentes = computed(() =>
    [...this.meusRelatos()].sort((a, b) => +new Date(b.criadoEm) - +new Date(a.criadoEm)).slice(0, 3),
  );
}
