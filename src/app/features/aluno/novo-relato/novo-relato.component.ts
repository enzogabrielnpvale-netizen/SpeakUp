import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarAlunoComponent } from '../../../shared/components/navbar/navbar-aluno.component';
import { AuthService } from '../../../core/services/auth.service';
import { RelatosService } from '../../../core/services/relatos.service';
import { CATEGORIAS } from '../../../core/models/relato.model';

@Component({
  selector: 'app-novo-relato',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NavbarAlunoComponent],
  templateUrl: './novo-relato.component.html',
  styleUrl: './novo-relato.component.css',
})
export class NovoRelatoComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private relatosService = inject(RelatosService);
  private router = inject(Router);

  readonly categorias = CATEGORIAS;
  arquivos = signal<string[]>([]);
  enviando = signal(false);

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

  aoSelecionarArquivos(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    if (!input.files) return;
    const nomes = Array.from(input.files).map((f) => f.name);
    this.arquivos.update((lista) => [...lista, ...nomes]);
  }

  removerArquivo(nome: string): void {
    this.arquivos.update((lista) => lista.filter((n) => n !== nome));
  }

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const usuario = this.auth.usuario();
    if (!usuario) return;

    this.enviando.set(true);
    const valores = this.form.getRawValue();
    this.relatosService.criarRelato({
      titulo: valores.titulo,
      descricao: valores.descricao,
      categoria: valores.categoria as any,
      alunoId: usuario.id,
      alunoNome: usuario.nome,
    });
    this.router.navigateByUrl('/aluno/dashboard');
  }

  cancelar(): void {
    this.router.navigateByUrl('/aluno/dashboard');
  }
}
