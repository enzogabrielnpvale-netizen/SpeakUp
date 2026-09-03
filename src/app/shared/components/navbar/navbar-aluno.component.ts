import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar-aluno',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LogoComponent],
  template: `
    <header class="nav">
      <div class="su-container nav-inner">
        <a routerLink="/aluno/dashboard"><app-logo /></a>

        <nav class="nav-links">
          <a routerLink="/aluno/dashboard" routerLinkActive="ativo">Dashboard</a>
          <a routerLink="/aluno/historico" routerLinkActive="ativo">Histórico</a>
        </nav>

        <div class="nav-actions">
          <button class="icon-btn" type="button" aria-label="Notificações">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span class="dot"></span>
          </button>

          <div class="usuario">
            <span class="avatar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21a8 8 0 1 0-16 0" /><circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <span class="nome">{{ auth.usuario()?.nome }}</span>
          </div>

          <button class="icon-btn" type="button" aria-label="Sair" (click)="sair()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .nav { background: #fff; border-bottom: 1px solid var(--su-gray-200); position: sticky; top: 0; z-index: 20; }
    .nav-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; gap: 24px; }
    .nav-links { display: flex; gap: 28px; flex: 1; }
    .nav-links a { font-size: 14px; font-weight: 500; color: var(--su-gray-500); padding: 6px 0; }
    .nav-links a.ativo { color: var(--su-blue-600); font-weight: 600; }
    .nav-actions { display: flex; align-items: center; gap: 18px; }
    .icon-btn { position: relative; background: transparent; border: none; color: var(--su-gray-600); display: flex; padding: 6px; border-radius: 8px; }
    .icon-btn:hover { background: var(--su-gray-100); }
    .dot { position: absolute; top: 4px; right: 4px; width: 7px; height: 7px; border-radius: 50%; background: var(--su-danger-600); }
    .usuario { display: flex; align-items: center; gap: 8px; }
    .avatar { width: 28px; height: 28px; border-radius: 50%; background: var(--su-blue-100); color: var(--su-blue-600); display: flex; align-items: center; justify-content: center; }
    .nome { font-size: 14px; font-weight: 600; color: var(--su-gray-900); }
  `],
})
export class NavbarAlunoComponent {
  protected auth = inject(AuthService);
  private router = inject(Router);

  sair(): void {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
