import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarGestaoComponent } from '../../../shared/components/navbar/navbar-gestao.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { DataBrPipe } from '../../../shared/pipes/data-br.pipe';
import { RelatosService } from '../../../core/services/relatos.service';
import { StatusRelato } from '../../../core/models/relato.model';
import { variantePrioridade, varianteStatus } from '../../../shared/utils/relato-visual.util';

const STATUS_DISPONIVEIS: StatusRelato[] = ['Recebido', 'Em Análise', 'Em Andamento', 'Resolvido'];
const PRIORIDADES_DISPONIVEIS = ['Baixa', 'Média', 'Alta', 'Urgente'];

@Component({
  selector: 'app-gerenciar-relatos',
  standalone: true,
  imports: [RouterLink, NavbarGestaoComponent, BadgeComponent, DataBrPipe],
  templateUrl: './gerenciar-relatos.component.html',
  styleUrl: './gerenciar-relatos.component.css',
})
export class GerenciarRelatosComponent {
  private relatosService = inject(RelatosService);

  protected varianteStatus = varianteStatus;
  protected variantePrioridade = variantePrioridade;
  protected statusDisponiveis = STATUS_DISPONIVEIS;
  protected prioridadesDisponiveis = PRIORIDADES_DISPONIVEIS;

  busca = signal('');
  statusFiltro = signal('todos');
  prioridadeFiltro = signal('todas');

  private todos = this.relatosService.relatos;

  total = computed(() => this.todos().length);
  recebidos = computed(() => this.todos().filter((r) => r.status === 'Recebido').length);
  emAnalise = computed(() => this.todos().filter((r) => r.status === 'Em Análise').length);
  emAndamento = computed(() => this.todos().filter((r) => r.status === 'Em Andamento').length);
  resolvidos = computed(() => this.todos().filter((r) => r.status === 'Resolvido').length);

  filtrados = computed(() => {
    const termo = this.busca().trim().toLowerCase();
    const status = this.statusFiltro();
    const prioridade = this.prioridadeFiltro();

    return [...this.todos()]
      .filter((r) => !termo || r.titulo.toLowerCase().includes(termo) || r.alunoNome.toLowerCase().includes(termo))
      .filter((r) => status === 'todos' || r.status === status)
      .filter((r) => prioridade === 'todas' || r.prioridade === prioridade)
      .sort((a, b) => +new Date(b.criadoEm) - +new Date(a.criadoEm));
  });

  exportar(): void {
    const linhas = [
      ['ID', 'Aluno', 'Título', 'Categoria', 'Prioridade', 'Status', 'Data'],
      ...this.filtrados().map((r) => [
        String(r.id), r.alunoNome, r.titulo, r.categoria, r.prioridade, r.status, new Date(r.criadoEm).toLocaleDateString('pt-BR'),
      ]),
    ];
    const csv = linhas.map((linha) => linha.map((c) => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'relatos-speakup.csv';
    link.click();
    URL.revokeObjectURL(url);
  }
}
