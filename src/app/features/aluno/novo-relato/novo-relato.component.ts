import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { AuthService } from '../../../core/services/auth.service';
import { RelatosService } from '../../../core/services/relatos.service';
import { CategoriaRelato, CATEGORIAS } from '../../../core/models/relato.model';

@Component({
  selector: 'app-novo-relato',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, LogoComponent],
  templateUrl: './novo-relato.component.html',
  styleUrl: './novo-relato.component.css',
})
export class NovoRelatoComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private relatosService = inject(RelatosService);
  private router = inject(Router);

  readonly categorias = CATEGORIAS;
  enviando = signal(false);
  erroEnvio = signal('');

  form = this.fb.nonNullable.group({
    titulo: ['', [Validators.required, Validators.minLength(4)]],
    categoria: ['', [Validators.required]],
    descricao: ['', [Validators.required, Validators.minLength(20)]],
  });

  get f() {
    return this.form.controls;
  }

  selecionarCategoria(valor: string): void {
    this.form.controls.categoria.setValue(valor);
  }

  async enviar(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const usuario = this.auth.usuario();
    if (!usuario?.uid) {
      this.erroEnvio.set('Sua sessão expirou. Entre novamente para enviar o relato.');
      return;
    }

    this.enviando.set(true);
    this.erroEnvio.set('');
    const valores = this.form.getRawValue();
    try {
      await this.relatosService.criarRelato({
        titulo: valores.titulo,
        descricao: valores.descricao,
        categoria: valores.categoria as CategoriaRelato,
        alunoId: usuario.id,
        alunoUid: usuario.uid,
        alunoNome: usuario.nome,
      });
      await this.router.navigateByUrl('/aluno/dashboard');
    } catch (error) {
      console.error('Erro ao enviar relato:', error);
      this.erroEnvio.set('Não foi possível enviar o relato. Tente novamente.');
    } finally {
      this.enviando.set(false);
    }
  }

  cancelar(): void {
    this.router.navigateByUrl('/aluno/dashboard');
  }
}
