import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarGestaoComponent } from '../../../shared/components/navbar/navbar-gestao.component';
import { UsuariosService } from '../../../core/services/usuarios.service';
import { RelatosService } from '../../../core/services/relatos.service';
import { SerieEscolar } from '../../../core/models/usuario.model';

const SERIES: SerieEscolar[] = ['7° Ano', '8° Ano', '9° Ano', '1° EM', '2° EM', '3° EM'];

@Component({
  selector: 'app-gerenciar-usuarios',
  standalone: true,
  imports: [RouterLink, NavbarGestaoComponent],
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrl: './gerenciar-usuarios.component.css',
})
export class GerenciarUsuariosComponent {
  private usuariosService = inject(UsuariosService);
  private relatosService = inject(RelatosService);

  protected series = SERIES;

  busca = signal('');
  serieFiltro = signal('todas');
  statusFiltro = signal('todos');

  total = this.usuariosService.total;
  ativos = this.usuariosService.ativos;
  inativos = this.usuariosService.inativos;
  totalRelatos = computed(() => this.relatosService.total());

  relatosDoUsuario(id: number): number {
    return this.relatosService.relatos().filter((r) => r.alunoId === id).length;
  }

  filtrados = computed(() => {
    const termo = this.busca().trim().toLowerCase();
    const serie = this.serieFiltro();
    const status = this.statusFiltro();

    return this.usuariosService
      .usuarios()
      .filter(
        (u) =>
          !termo ||
          u.nome.toLowerCase().includes(termo) ||
          u.email.toLowerCase().includes(termo) ||
          u.matricula.includes(termo),
      )
      .filter((u) => serie === 'todas' || u.serie === serie)
      .filter((u) => status === 'todos' || u.status === status);
  });

  alternarStatus(id: number): void {
    this.usuariosService.alternarStatus(id);
  }

  remover(id: number, nome: string): void {
    if (confirm(`Remover o usuário "${nome}"? Esta ação não pode ser desfeita.`)) {
      this.usuariosService.remover(id);
    }
  }
}
