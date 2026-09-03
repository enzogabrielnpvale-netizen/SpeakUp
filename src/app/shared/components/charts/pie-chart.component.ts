import { Component, computed, input } from '@angular/core';

export interface FatiaPizza {
  rotulo: string;
  valor: number;
  cor: string;
}

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  template: `
    <div class="pie-wrap">
      <svg viewBox="0 0 200 200" class="pie-svg">
        @for (fatia of fatias(); track fatia.rotulo) {
          <path [attr.d]="fatia.path" [attr.fill]="fatia.cor" />
        }
        <circle cx="100" cy="100" r="55" fill="#fff" />
      </svg>
      <ul class="legenda">
        @for (fatia of fatias(); track fatia.rotulo) {
          <li>
            <i [style.background]="fatia.cor"></i>
            <span class="rotulo">{{ fatia.rotulo }}</span>
            <span class="valor">{{ fatia.valor }}</span>
          </li>
        }
      </ul>
    </div>
  `,
  styles: [`
    .pie-wrap { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
    .pie-svg { width: 150px; height: 150px; flex-shrink: 0; }
    .legenda { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; flex: 1; min-width: 140px; }
    .legenda li { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--su-gray-700); }
    .legenda i { width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0; }
    .rotulo { flex: 1; }
    .valor { font-weight: 600; color: var(--su-gray-900); }
  `],
})
export class PieChartComponent {
  dados = input<FatiaPizza[]>([]);

  fatias = computed(() => {
    const lista = this.dados();
    const total = lista.reduce((soma, d) => soma + d.valor, 0) || 1;
    let anguloAtual = -90;
    const cx = 100, cy = 100, raio = 90;

    return lista.map((d) => {
      const anguloFatia = (d.valor / total) * 360;
      const inicio = anguloAtual;
      const fim = anguloAtual + anguloFatia;
      anguloAtual = fim;

      const grandeArco = anguloFatia > 180 ? 1 : 0;
      const p1 = this.pontoNoCirculo(cx, cy, raio, inicio);
      const p2 = this.pontoNoCirculo(cx, cy, raio, fim);

      const path = `M ${cx} ${cy} L ${p1.x} ${p1.y} A ${raio} ${raio} 0 ${grandeArco} 1 ${p2.x} ${p2.y} Z`;

      return { rotulo: d.rotulo, valor: d.valor, cor: d.cor, path };
    });
  });

  private pontoNoCirculo(cx: number, cy: number, raio: number, anguloGraus: number) {
    const rad = (anguloGraus * Math.PI) / 180;
    return { x: cx + raio * Math.cos(rad), y: cy + raio * Math.sin(rad) };
  }
}
