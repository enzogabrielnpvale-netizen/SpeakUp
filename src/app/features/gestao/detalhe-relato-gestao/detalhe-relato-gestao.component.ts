import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NavbarGestaoComponent } from '../../../shared/components/navbar/navbar-gestao.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { DataBrPipe } from '../../../shared/pipes/data-br.pipe';
import { RelatosService } from '../../../core/services/relatos.service';
import { PrioridadeRelato, StatusRelato } from '../../../core/models/relato.model';
import { varianteCategoria, variantePrioridade, varianteStatus } from '../../../shared/utils/relato-visual.util';

const STATUS_DISPONIVEIS: StatusRelato[] = ['Recebido', 'Em Análise', 'Em Andamento', 'Resolvido'];
const PRIORIDADES_DISPONIVEIS: PrioridadeRelato[] = ['Baixa', 'Média', 'Alta', 'Urgente'];

@Component({
  selector: 'app-detalhe-relato-gestao',
  standalone: true,
  imports: [RouterLink, FormsModule, NavbarGestaoComponent, BadgeComponent, DataBrPipe],
  templateUrl: './detalhe-relato-gestao.component.html',
  styleUrl: './detalhe-relato-gestao.component.css',
})
export class DetalheRelatoGestaoComponent {
  private route = inject(ActivatedRoute);
  private relatosService = inject(RelatosService);

  protected varianteCategoria = varianteCategoria;
  protected varianteStatus = varianteStatus;
  protected variantePrioridade = variantePrioridade;
  protected statusDisponiveis = STATUS_DISPONIVEIS;
  protected prioridadesDisponiveis = PRIORIDADES_DISPONIVEIS;

  private id = toSignal(this.route.paramMap.pipe(map((p) => Number(p.get('id')))), { initialValue: 0 });
  relato = computed(() => this.relatosService.porId(this.id()));

  resposta = signal('');
  statusSelecionado = signal<StatusRelato>('Em Análise');
  prioridadeSelecionada = signal<PrioridadeRelato>('Média');
  enviado = signal(false);
  prioridadeAtualizada = signal(false);
  salvando = signal(false);
  erroAtualizacao = signal<string | null>(null);
  private formInicializado = false;

  constructor() {
    effect(() => {
      const r = this.relato();
      if (r && !this.formInicializado) {
        this.resposta.set(r.respostaGestao ?? '');
        this.statusSelecionado.set(r.status);
        this.prioridadeSelecionada.set(r.prioridade);
        this.formInicializado = true;
      }
    });
  }

  async enviarResposta(): Promise<void> {
    const r = this.relato();
    if (!r || this.salvando()) return;

    const resposta = this.resposta().trim();
    const statusAlterado = this.statusSelecionado() !== r.status;
    if (!resposta && !statusAlterado) return;

    this.salvando.set(true);
    this.erroAtualizacao.set(null);
    try {
      if (resposta) {
        await this.relatosService.responder(r.id, resposta, this.statusSelecionado());
      } else {
        await this.relatosService.atualizarStatus(r.id, this.statusSelecionado());
      }
      this.enviado.set(true);
      setTimeout(() => this.enviado.set(false), 2500);
    } catch (error) {
      console.error('Erro ao atualizar relato:', error);
      this.erroAtualizacao.set('Não foi possível salvar as alterações. Verifique sua conexão e tente novamente.');
    } finally {
      this.salvando.set(false);
    }
  }

  salvarPrioridade(): void {
    const r = this.relato();
    if (!r) return;
    this.relatosService.atualizarPrioridade(r.id, this.prioridadeSelecionada());
    this.prioridadeAtualizada.set(true);
    setTimeout(() => this.prioridadeAtualizada.set(false), 2500);
  }
}
