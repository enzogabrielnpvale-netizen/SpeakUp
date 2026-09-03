import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { NavbarAlunoComponent } from '../../../shared/components/navbar/navbar-aluno.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { DataBrPipe } from '../../../shared/pipes/data-br.pipe';
import { RelatosService } from '../../../core/services/relatos.service';
import { varianteCategoria, variantePrioridade, varianteStatus } from '../../../shared/utils/relato-visual.util';

@Component({
  selector: 'app-detalhe-relato',
  standalone: true,
  imports: [RouterLink, NavbarAlunoComponent, BadgeComponent, DataBrPipe],
  templateUrl: './detalhe-relato.component.html',
  styleUrl: './detalhe-relato.component.css',
})
export class DetalheRelatoComponent {
  private route = inject(ActivatedRoute);
  private relatosService = inject(RelatosService);

  protected varianteCategoria = varianteCategoria;
  protected varianteStatus = varianteStatus;
  protected variantePrioridade = variantePrioridade;

  private id = toSignal(this.route.paramMap.pipe(map((p) => Number(p.get('id')))), { initialValue: 0 });
  relato = computed(() => this.relatosService.porId(this.id()));
}
