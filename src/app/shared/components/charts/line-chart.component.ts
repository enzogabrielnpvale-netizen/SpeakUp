import { Component, computed, input } from '@angular/core';

export interface SerieLinha {
  nome: string;
  cor: string;
  valores: number[];
}

@Component({
  selector: 'app-line-chart',
  standalone: true,
  template: `
    <div class="chart-wrap">
      <svg [attr.viewBox]="'0 0 ' + largura + ' ' + altura" preserveAspectRatio="xMidYMid meet">
        @for (linha of linhasGrade(); track linha.y) {
          <line [attr.x1]="margemEsq" [attr.x2]="largura - margemDir" [attr.y1]="linha.y" [attr.y2]="linha.y" stroke="#e2e8f0" stroke-width="1" />
          <text [attr.x]="margemEsq - 10" [attr.y]="linha.y + 4" font-size="11" fill="#64748b" text-anchor="end">{{ linha.valor }}</text>
        }

        @for (s of series(); track s.nome) {
          <polyline [attr.points]="pontos(s.valores)" fill="none" [attr.stroke]="s.cor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
          @for (v of s.valores; track $index; let i = $index) {
            <circle [attr.cx]="x(i)" [attr.cy]="y(v)" r="3.5" [attr.fill]="s.cor" />
          }
        }

        @for (cat of categorias(); track $index; let i = $index) {
          <text [attr.x]="x(i)" [attr.y]="altura - 6" font-size="11" fill="#64748b" text-anchor="middle">{{ cat }}</text>
        }
      </svg>

      @if (series().length > 1) {
        <div class="legenda">
          @for (s of series(); track s.nome) {
            <span class="item"><i [style.background]="s.cor"></i>{{ s.nome }}</span>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .chart-wrap { width: 100%; }
    svg { width: 100%; height: 220px; display: block; }
    .legenda { display: flex; gap: 16px; margin-top: 10px; flex-wrap: wrap; justify-content: center; }
    .item { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: var(--su-gray-600); }
    .item i { width: 10px; height: 10px; border-radius: 3px; display: inline-block; }
  `],
})
export class LineChartComponent {
  categorias = input<string[]>([]);
  series = input<SerieLinha[]>([]);
  maxY = input<number | undefined>(undefined);

  readonly largura = 560;
  readonly altura = 240;
  readonly margemEsq = 34;
  readonly margemDir = 14;
  readonly margemTopo = 14;
  readonly margemBase = 26;

  private maximoCalculado = computed(() => {
    const todos = this.series().flatMap((s) => s.valores);
    const max = Math.max(1, ...todos);
    return this.maxY() ?? (Math.ceil(max / 10) * 10 || max);
  });

  linhasGrade() {
    const max = this.maximoCalculado();
    const passos = 4;
    const linhas = [];
    for (let i = 0; i <= passos; i++) {
      const valor = Math.round((max / passos) * i);
      const y = this.altura - this.margemBase - ((this.altura - this.margemTopo - this.margemBase) * i) / passos;
      linhas.push({ y, valor });
    }
    return linhas;
  }

  x(indice: number): number {
    const n = Math.max(1, this.categorias().length - 1);
    const areaUtil = this.largura - this.margemEsq - this.margemDir;
    return this.margemEsq + (areaUtil * indice) / n;
  }

  y(valor: number): number {
    const max = this.maximoCalculado();
    const alturaUtil = this.altura - this.margemTopo - this.margemBase;
    return this.altura - this.margemBase - (valor / max) * alturaUtil;
  }

  pontos(valores: number[]): string {
    return valores.map((v, i) => `${this.x(i)},${this.y(v)}`).join(' ');
  }
}
