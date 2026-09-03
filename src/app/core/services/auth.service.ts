import { Injectable, computed, signal } from '@angular/core';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { CredenciaisLogin, DadosCadastro, Papel, UsuarioLogado } from '../models/auth.model';

const STORAGE_KEY = 'speakup.usuarioLogado';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _usuario = signal<UsuarioLogado | null>(this.recuperarSessao());

  readonly usuario = this._usuario.asReadonly();
  readonly estaAutenticado = computed(() => this._usuario() !== null);
  readonly papel = computed<Papel | null>(() => this._usuario()?.papel ?? null);

  private recuperarSessao(): UsuarioLogado | null {
    try {
      const bruto = localStorage.getItem(STORAGE_KEY);
      return bruto ? (JSON.parse(bruto) as UsuarioLogado) : null;
    } catch {
      return null;
    }
  }

  private persistir(usuario: UsuarioLogado | null): void {
    if (usuario) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  async loginAluno(credenciais: CredenciaisLogin): Promise<UsuarioLogado> {
    const result = await signInWithEmailAndPassword(auth, credenciais.email, credenciais.senha);
    const usuario: UsuarioLogado = {
      id: parseInt(result.user.uid.slice(0, 8), 16) || Date.now(),
      nome: result.user.displayName ?? result.user.email?.split('@')[0] ?? 'João Silva',
      email: result.user.email ?? credenciais.email,
      papel: 'aluno',
    };
    this._usuario.set(usuario);
    this.persistir(usuario);
    return usuario;
  }

  async loginGestao(credenciais: CredenciaisLogin): Promise<UsuarioLogado> {
    const result = await signInWithEmailAndPassword(auth, credenciais.email, credenciais.senha);
    const usuario: UsuarioLogado = {
      id: parseInt(result.user.uid.slice(0, 8), 16) || Date.now(),
      nome: result.user.displayName ?? result.user.email?.split('@')[0] ?? 'Maria Santos',
      email: result.user.email ?? credenciais.email,
      papel: 'gestao',
    };
    this._usuario.set(usuario);
    this.persistir(usuario);
    return usuario;
  }

  async registrar(dados: DadosCadastro): Promise<UsuarioLogado> {
    const result = await createUserWithEmailAndPassword(auth, dados.email, dados.senha);
    const usuario: UsuarioLogado = {
      id: parseInt(result.user.uid.slice(0, 8), 16) || Date.now(),
      nome: dados.nome,
      email: result.user.email ?? dados.email,
      papel: 'aluno',
    };
    this._usuario.set(usuario);
    this.persistir(usuario);
    return usuario;
  }

  async logout(): Promise<void> {
    await signOut(auth);
    this._usuario.set(null);
    this.persistir(null);
  }
}
