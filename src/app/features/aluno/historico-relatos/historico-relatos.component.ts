import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarAlunoComponent } from '../../../shared/components/navbar/navbar-aluno.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { DataBrPipe } from '../../../shared/pipes/data-br.pipe';
import { AuthService } from '../../../core/services/auth.service';
import { RelatosService } from '../../../core/services/relatos.service';
import { CATEGORIAS, StatusRelato } from '../../../core/models/relato.model';
import { varianteCategoria, variantePrioridade, varianteStatus } from '../../../shared/utils/relato-visual.util';

const STATUS_DISPONIVEIS: StatusRelato[] = ['Recebido', 'Em Análise', 'Em Andamento', 'Resolvido'];

@Component({
  selector: 'app-historico-relatos',
  standalone: true,
  imports: [RouterLink, NavbarAlunoComponent, BadgeComponent, DataBrPipe],
  templateUrl: './historico-relatos.component.html',
  styleUrl: './historico-relatos.component.css',
})
export class HistoricoRelatosComponent {
  private auth = inject(AuthService);
  private relatosService = inject(RelatosService);

  protected varianteCategoria = varianteCategoria;
  protected varianteStatus = varianteStatus;
  protected variantePrioridade = variantePrioridade;
  protected categorias = CATEGORIAS;
  protected statusDisponiveis = STATUS_DISPONIVEIS;

  busca = signal('');
  categoriaFiltro = signal('todas');
  statusFiltro = signal('todos');

  private meusRelatos = computed(() => {
    const id = this.auth.usuario()?.id ?? 0;
    return this.relatosService.relatos().filter((r) => r.alunoId === id);
  });

  total = computed(() => this.meusRelatos().length);
  emAndamento = computed(() => this.meusRelatos().filter((r) => r.status === 'Em Andamento').length);
  resolvidos = computed(() => this.meusRelatos().filter((r) => r.status === 'Resolvido').length);
  emAnalise = computed(() => this.meusRelatos().filter((r) => r.status === 'Em Análise').length);

  filtrados = computed(() => {
    const termo = this.busca().trim().toLowerCase();
    const categoria = this.categoriaFiltro();
    const status = this.statusFiltro();

    return [...this.meusRelatos()]
      .filter((r) => !termo || r.titulo.toLowerCase().includes(termo))
      .filter((r) => categoria === 'todas' || r.categoria === categoria)
      .filter((r) => status === 'todos' || r.status === status)
      .sort((a, b) => +new Date(b.criadoEm) - +new Date(a.criadoEm));
  });
}
