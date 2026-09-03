import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then((m) => m.LandingComponent),
    title: 'SpeakUp — Sua voz importa',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login-aluno/login-aluno.component').then((m) => m.LoginAlunoComponent),
    title: 'Entrar — SpeakUp',
  },
  {
    path: 'login-gestao',
    loadComponent: () => import('./features/auth/login-gestao/login-gestao.component').then((m) => m.LoginGestaoComponent),
    title: 'Acesso da Gestão — SpeakUp',
  },
  {
    path: 'registrar',
    loadComponent: () => import('./features/auth/register/register.component').then((m) => m.RegisterComponent),
    title: 'Criar conta — SpeakUp',
  },

  // ---- Área do aluno ----
  {
    path: 'aluno/dashboard',
    canActivate: [authGuard('aluno')],
    loadComponent: () => import('./features/aluno/dashboard-aluno/dashboard-aluno.component').then((m) => m.DashboardAlunoComponent),
    title: 'Dashboard — SpeakUp',
  },
  {
    path: 'aluno/novo-relato',
    canActivate: [authGuard('aluno')],
    loadComponent: () => import('./features/aluno/novo-relato/novo-relato.component').then((m) => m.NovoRelatoComponent),
    title: 'Novo Relato — SpeakUp',
  },
  {
    path: 'aluno/historico',
    canActivate: [authGuard('aluno')],
    loadComponent: () =>
      import('./features/aluno/historico-relatos/historico-relatos.component').then((m) => m.HistoricoRelatosComponent),
    title: 'Histórico de Relatos — SpeakUp',
  },
  {
    path: 'aluno/relato/:id',
    canActivate: [authGuard('aluno')],
    loadComponent: () => import('./features/aluno/detalhe-relato/detalhe-relato.component').then((m) => m.DetalheRelatoComponent),
    title: 'Detalhe do Relato — SpeakUp',
  },

  // ---- Área da gestão ----
  {
    path: 'gestao/dashboard',
    canActivate: [authGuard('gestao')],
    loadComponent: () => import('./features/gestao/dashboard-gestao/dashboard-gestao.component').then((m) => m.DashboardGestaoComponent),
    title: 'Dashboard Administrativo — SpeakUp',
  },
  {
    path: 'gestao/relatos',
    canActivate: [authGuard('gestao')],
    loadComponent: () =>
      import('./features/gestao/gerenciar-relatos/gerenciar-relatos.component').then((m) => m.GerenciarRelatosComponent),
    title: 'Gerenciar Relatos — SpeakUp',
  },
  {
    path: 'gestao/relatos/:id',
    canActivate: [authGuard('gestao')],
    loadComponent: () =>
      import('./features/gestao/detalhe-relato-gestao/detalhe-relato-gestao.component').then((m) => m.DetalheRelatoGestaoComponent),
    title: 'Detalhe do Relato — SpeakUp',
  },
  {
    path: 'gestao/usuarios',
    canActivate: [authGuard('gestao')],
    loadComponent: () =>
      import('./features/gestao/gerenciar-usuarios/gerenciar-usuarios.component').then((m) => m.GerenciarUsuariosComponent),
    title: 'Gerenciar Usuários — SpeakUp',
  },
  {
    path: 'gestao/estatisticas',
    canActivate: [authGuard('gestao')],
    loadComponent: () => import('./features/gestao/estatisticas/estatisticas.component').then((m) => m.EstatisticasComponent),
    title: 'Relatórios e Estatísticas — SpeakUp',
  },

  { path: '**', redirectTo: '' },
];
