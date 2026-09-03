import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  template: `
    <span class="logo" [class.logo-lg]="tamanho === 'lg'">
      <span class="logo-icon" [style.width.px]="tamanho === 'lg' ? 44 : 32" [style.height.px]="tamanho === 'lg' ? 44 : 32">
        <svg viewBox="0 0 24 24" fill="none" width="60%" height="60%">
          <path
            d="M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4.4 3.3A.6.6 0 0 1 3.6 19V5a1 1 0 0 1 1-1z"
            fill="white"
          />
        </svg>
      </span>
      @if (mostrarNome) {
        <span class="logo-nome">SpeakUp</span>
      }
    </span>
  `,
  styles: [`
    .logo { display: inline-flex; align-items: center; gap: 10px; }
    .logo-icon {
      display: inline-flex; align-items: center; justify-content: center;
      background: var(--su-blue-600); border-radius: 9px; flex-shrink: 0;
    }
    .logo-nome { font-weight: 700; font-size: 19px; color: var(--su-gray-900); }
    .logo-lg .logo-nome { font-size: 22px; }
  `],
})
export class LogoComponent {
  @Input() mostrarNome = true;
  @Input() tamanho: 'md' | 'lg' = 'md';
}
