import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { AuthService } from '../../../core/services/auth.service';

function senhasIguaisValidator(control: AbstractControl): ValidationErrors | null {
  const senha = control.get('senha')?.value;
  const confirmar = control.get('confirmarSenha')?.value;
  return senha && confirmar && senha !== confirmar ? { senhasDiferentes: true } : null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, LogoComponent],
  templateUrl: './register.component.html',
  styleUrl: '../auth-split.css',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  enviando = signal(false);

  readonly series = ['1° EM', '2° EM', '3° EM'];

  form = this.fb.nonNullable.group(
    {
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      matricula: ['', [Validators.required, Validators.pattern(/^\d{4,10}$/)]],
      serie: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]],
      aceiteTermos: [false, [Validators.requiredTrue]],
    },
    { validators: senhasIguaisValidator },
  );

  get f() {
    return this.form.controls;
  }

  async enviar(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enviando.set(true);
    const valores = this.form.getRawValue();

    try {
      await this.auth.registrar(valores);
      this.router.navigateByUrl('/aluno/dashboard');
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      this.form.get('email')?.setErrors({ firebase: true });
    } finally {
      this.enviando.set(false);
    }
  }
}
