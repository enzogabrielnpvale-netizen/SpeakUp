import { Component, inject, signal } from '@angular/core';
import { FirebaseError } from 'firebase/app';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, LogoComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly voltar = inject(ActivatedRoute).snapshot.queryParamMap.get('voltar');

  readonly voltarPara = this.voltar === '/login-gestao' ? '/login-gestao' : '/login';
  readonly enviando = signal(false);
  readonly sucesso = signal(false);
  readonly erro = signal('');

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  get f() {
    return this.form.controls;
  }

  async enviar(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enviando.set(true);
    this.erro.set('');
    this.sucesso.set(false);

    try {
      await this.auth.recuperarSenha(this.f.email.value);
      this.sucesso.set(true);
    } catch (error) {
      if (error instanceof FirebaseError && error.code === 'auth/user-not-found') {
        this.sucesso.set(true);
      } else {
        console.error('Erro ao solicitar redefinição de senha:', error);
        this.erro.set(
          error instanceof FirebaseError && error.code === 'auth/too-many-requests'
            ? 'Muitas tentativas. Aguarde um pouco e tente novamente.'
            : 'Não foi possível enviar o e-mail. Verifique sua conexão e tente novamente.',
        );
      }
    } finally {
      this.enviando.set(false);
    }
  }
}
