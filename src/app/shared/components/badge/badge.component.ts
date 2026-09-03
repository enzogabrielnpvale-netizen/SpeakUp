import { Component, Input } from '@angular/core';
import { VarianteBadge } from '../../utils/relato-visual.util';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `<span class="su-badge" [class]="'su-badge-' + variante"><ng-content></ng-content></span>`,
})
export class BadgeComponent {
  @Input() variante: VarianteBadge = 'gray';
}
