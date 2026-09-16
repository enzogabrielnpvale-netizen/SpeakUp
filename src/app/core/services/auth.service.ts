import { Injectable, computed, signal } from '@angular/core';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { get, ref, set, update } from 'firebase/database';
import { auth } from '../../firebase';
import { database } from '../../firebase';
import { CredenciaisLogin, DadosCadastro, Papel, UsuarioLogado } from '../models/auth.model';

const STORAGE_KEY = 'speakup.usuarioLogado';

interface PerfilRealtime {
  id: number;
  nome: string;
  email: string;
  papel: Papel;
  matricula?: string;
  serie?: string;
  status?: 'Ativo' | 'Inativo';
  ultimoAcesso?: string;
}

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
    return this.finalizarLogin(result.user, 'aluno', credenciais.email);
  }

  async loginGestao(credenciais: CredenciaisLogin): Promise<UsuarioLogado> {
    const result = await signInWithEmailAndPassword(auth, credenciais.email, credenciais.senha);
    return this.finalizarLogin(result.user, 'gestao', credenciais.email);
  }

  async registrar(dados: DadosCadastro): Promise<UsuarioLogado> {
    const result = await createUserWithEmailAndPassword(auth, dados.email, dados.senha);
    const id = this.idNumerico(result.user.uid);
    const perfil: PerfilRealtime = {
      id,
      nome: dados.nome,
      email: result.user.email ?? dados.email,
      papel: 'aluno',
      matricula: dados.matricula,
      serie: dados.serie,
      status: 'Ativo',
      ultimoAcesso: this.dataAtual(),
    };
    await set(ref(database, `usuarios/${result.user.uid}`), perfil);

    const usuario: UsuarioLogado = {
      id,
      nome: dados.nome,
      email: result.user.email ?? dados.email,
      papel: 'aluno',
    };
    this._usuario.set(usuario);
    this.persistir(usuario);
    return usuario;
  }

  private async finalizarLogin(firebaseUser: import('firebase/auth').User, papelEsperado: Papel, emailFallback: string): Promise<UsuarioLogado> {
    const perfilSnapshot = await get(ref(database, `usuarios/${firebaseUser.uid}`));
    const perfil = perfilSnapshot.val() as PerfilRealtime | null;
    const papel = perfil?.papel ?? papelEsperado;

    if (papel !== papelEsperado) {
      throw new Error('Este usuário não possui permissão para este tipo de acesso.');
    }

    const usuario: UsuarioLogado = {
      id: perfil?.id ?? this.idNumerico(firebaseUser.uid),
      nome: perfil?.nome ?? firebaseUser.displayName ?? firebaseUser.email?.split('@')[0] ?? 'Usuário',
      email: perfil?.email ?? firebaseUser.email ?? emailFallback,
      papel,
    };

    if (perfilSnapshot.exists()) {
      await update(ref(database, `usuarios/${firebaseUser.uid}`), { ultimoAcesso: this.dataAtual() });
    }

    this._usuario.set(usuario);
    this.persistir(usuario);
    return usuario;
  }

  private idNumerico(uid: string): number {
    return parseInt(uid.slice(0, 8), 16) || Date.now();
  }

  private dataAtual(): string {
    return new Date().toISOString().slice(0, 10);
  }

  async logout(): Promise<void> {
    await signOut(auth);
    this._usuario.set(null);
    this.persistir(null);
  }
}
