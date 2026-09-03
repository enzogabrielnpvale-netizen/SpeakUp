import { Component, Input } from '@angular/core';

export type CorIcone = 'blue' | 'green' | 'amber' | 'red' | 'gray';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  template: `
    <div class="su-card stat-card">
      <div class="stat-header">
        <span class="stat-label">{{ label }}</span>
        <span class="stat-icon" [class]="'icon-' + cor">
          <ng-content select="[icon]"></ng-content>
        </span>
      </div>
      <div class="stat-valor" [class]="'valor-' + cor">{{ valor }}</div>
      @if (legenda) {
        <div class="stat-legenda">{{ legenda }}</div>
      }
    </div>
  `,
  styles: [`
    .stat-card { padding: 18px 20px; }
    .stat-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
    .stat-label { font-size: 13px; color: var(--su-gray-500); font-weight: 500; }
    .stat-icon { display: inline-flex; color: var(--su-gray-400); }
    .stat-icon.icon-blue { color: var(--su-info-600); }
    .stat-icon.icon-green { color: var(--su-success-600); }
    .stat-icon.icon-amber { color: var(--su-warning-600); }
    .stat-icon.icon-red { color: var(--su-danger-600); }
    .stat-valor { font-size: 28px; font-weight: 700; color: var(--su-gray-900); line-height: 1; }
    .stat-valor.valor-blue { color: var(--su-info-600); }
    .stat-valor.valor-green { color: var(--su-success-600); }
    .stat-valor.valor-amber { color: var(--su-warning-600); }
    .stat-valor.valor-red { color: var(--su-danger-600); }
    .stat-legenda { margin-top: 6px; font-size: 12px; color: var(--su-gray-500); }
  `],
})
export class StatCardComponent {
  @Input() label = '';
  @Input() valor: string | number = 0;
  @Input() legenda = '';
  @Input() cor: CorIcone = 'gray';
}
