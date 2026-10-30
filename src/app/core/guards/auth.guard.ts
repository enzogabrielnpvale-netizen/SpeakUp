import { inject, Injector } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Papel } from '../models/auth.model';

/** Protege rotas exigindo autenticação e, opcionalmente, um papel específico. */
export function authGuard(papelExigido?: Papel): CanActivateFn {
  return async () => {
    const injector = inject(Injector);
    const router = inject(Router);
    const { AuthService } = await import('../services/auth.service');
    const auth = injector.get(AuthService);
    const usuario = auth.usuario();

    if (!usuario) {
      return router.parseUrl(papelExigido === 'gestao' ? '/login-gestao' : '/login');
    }

    if (papelExigido && usuario.papel !== papelExigido) {
      return router.parseUrl(usuario.papel === 'gestao' ? '/gestao/dashboard' : '/aluno/dashboard');
    }

    return true;
  };
}
