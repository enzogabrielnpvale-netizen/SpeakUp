import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login-gestao',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, LogoComponent],
  templateUrl: './login-gestao.component.html',
  styleUrl: '../auth-split.css',
})
export class LoginGestaoComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  senhaVisivel = signal(false);
  enviando = signal(false);
  erroLogin = signal('');

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    lembrarMe: [false],
  });

  get f() {
    return this.form.controls;
  }

  alternarSenha(): void {
    this.senhaVisivel.update((v) => !v);
  }

  async enviar(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enviando.set(true);
    this.erroLogin.set('');
    const valores = this.form.getRawValue();

    try {
      await this.auth.loginGestao({ email: valores.email, senha: valores.senha, lembrarMe: valores.lembrarMe });
      this.router.navigateByUrl('/gestao/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login da gestão:', error);
      this.erroLogin.set(
        error instanceof Error && error.message === 'Esta conta não possui permissão de gestão.'
          ? 'Credenciais aceitas, mas o papel desta conta no Realtime Database não está definido como "gestao".'
          : error instanceof Error &&
              error.message === 'Não foi possível consultar o papel da conta no Realtime Database.'
            ? 'Não foi possível verificar seu acesso. Confira as regras do Realtime Database e tente novamente.'
          : 'Não foi possível entrar. Verifique seu e-mail e sua senha.',
      );
    } finally {
      this.enviando.set(false);
    }
  }
}
