import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NavbarGestaoComponent } from '../../../shared/components/navbar/navbar-gestao.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { DataBrPipe } from '../../../shared/pipes/data-br.pipe';
import { RelatosService } from '../../../core/services/relatos.service';
import { StatusRelato } from '../../../core/models/relato.model';
import { varianteCategoria, variantePrioridade, varianteStatus } from '../../../shared/utils/relato-visual.util';

const STATUS_DISPONIVEIS: StatusRelato[] = ['Recebido', 'Em Análise', 'Em Andamento', 'Resolvido'];

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

  private id = toSignal(this.route.paramMap.pipe(map((p) => Number(p.get('id')))), { initialValue: 0 });
  relato = computed(() => this.relatosService.porId(this.id()));

  resposta = signal('');
  statusSelecionado = signal<StatusRelato>('Em Análise');
  enviado = signal(false);
  private formInicializado = false;

  constructor() {
    effect(() => {
      const r = this.relato();
      if (r && !this.formInicializado) {
        this.resposta.set(r.respostaGestao ?? '');
        this.statusSelecionado.set(r.status);
        this.formInicializado = true;
      }
    });
  }

  enviarResposta(): void {
    const r = this.relato();
    if (!r || !this.resposta().trim()) return;
    this.relatosService.responder(r.id, this.resposta().trim(), this.statusSelecionado());
    this.enviado.set(true);
    setTimeout(() => this.enviado.set(false), 2500);
  }
}
