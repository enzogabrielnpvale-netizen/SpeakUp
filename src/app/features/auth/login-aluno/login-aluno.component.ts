import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login-aluno',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, LogoComponent],
  templateUrl: './login-aluno.component.html',
  styleUrl: '../auth-split.css',
})
export class LoginAlunoComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  senhaVisivel = signal(false);
  enviando = signal(false);

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
    const valores = this.form.getRawValue();

    try {
      await this.auth.loginAluno({ email: valores.email, senha: valores.senha, lembrarMe: valores.lembrarMe });
      this.router.navigateByUrl('/aluno/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login do aluno:', error);
      this.form.get('senha')?.setErrors({ firebase: true });
    } finally {
      this.enviando.set(false);
    }
  }
}
