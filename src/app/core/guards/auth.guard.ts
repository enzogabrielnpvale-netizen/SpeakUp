import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Papel } from '../models/auth.model';

/** Protege rotas exigindo autenticação e, opcionalmente, um papel específico. */
export function authGuard(papelExigido?: Papel): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
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
