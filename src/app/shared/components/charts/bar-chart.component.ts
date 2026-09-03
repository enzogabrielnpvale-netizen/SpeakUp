import { Component, computed, input } from '@angular/core';

export interface SerieBarra {
  nome: string;
  cor: string;
  valores: number[];
}

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  template: `
    <div class="chart-wrap">
      <svg [attr.viewBox]="'0 0 ' + largura + ' ' + altura" preserveAspectRatio="xMidYMid meet">
        <!-- linhas de grade -->
        @for (linha of linhasGrade(); track linha.y) {
          <line [attr.x1]="margemEsq" [attr.x2]="largura - margemDir" [attr.y1]="linha.y" [attr.y2]="linha.y" stroke="#e2e8f0" stroke-width="1" />
          <text [attr.x]="margemEsq - 10" [attr.y]="linha.y + 4" font-size="11" fill="#64748b" text-anchor="end">{{ linha.valor }}</text>
        }
        <!-- barras -->
        @for (grupo of categorias(); track $index; let ci = $index) {
          @for (s of series(); track s.nome; let si = $index) {
            <rect
              [attr.x]="xBarra(ci, si)"
              [attr.y]="yBarra(s.valores[ci])"
              [attr.width]="larguraBarra()"
              [attr.height]="alturaBarra(s.valores[ci])"
              [attr.fill]="s.cor"
              rx="2"
            />
          }
          <text [attr.x]="xCentroGrupo(ci)" [attr.y]="altura - 8" font-size="11" fill="#64748b" text-anchor="middle">{{ grupo }}</text>
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
export class BarChartComponent {
  categorias = input<string[]>([]);
  series = input<SerieBarra[]>([]);
  maxY = input<number | undefined>(undefined);

  readonly largura = 560;
  readonly altura = 240;
  readonly margemEsq = 34;
  readonly margemDir = 10;
  readonly margemTopo = 14;
  readonly margemBase = 26;

  private maximoCalculado = computed(() => {
    const todos = this.series().flatMap((s) => s.valores);
    const max = Math.max(1, ...todos);
    const maxY = this.maxY();
    return maxY ?? Math.max(Math.ceil(max / 10) * 10, max);
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

  private areaUtil() {
    return this.largura - this.margemEsq - this.margemDir;
  }

  larguraGrupo(): number {
    const n = Math.max(1, this.categorias().length);
    return this.areaUtil() / n;
  }

  larguraBarra(): number {
    const n = Math.max(1, this.series().length);
    return (this.larguraGrupo() * 0.6) / n;
  }

  xCentroGrupo(indiceCategoria: number): number {
    return this.margemEsq + this.larguraGrupo() * indiceCategoria + this.larguraGrupo() / 2;
  }

  xBarra(indiceCategoria: number, indiceSerie: number): number {
    const grupoLargura = this.larguraGrupo();
    const totalBarrasLargura = this.larguraBarra() * this.series().length;
    const inicioGrupo = this.margemEsq + grupoLargura * indiceCategoria + (grupoLargura - totalBarrasLargura) / 2;
    return inicioGrupo + this.larguraBarra() * indiceSerie;
  }

  yBarra(valor: number): number {
    const max = this.maximoCalculado();
    const alturaUtil = this.altura - this.margemTopo - this.margemBase;
    return this.altura - this.margemBase - (valor / max) * alturaUtil;
  }

  alturaBarra(valor: number): number {
    return this.altura - this.margemBase - this.yBarra(valor);
  }
}
