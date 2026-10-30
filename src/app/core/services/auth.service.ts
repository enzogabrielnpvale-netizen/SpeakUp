import { Injectable, computed, signal } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { get, ref, set } from 'firebase/database';
import { auth, database } from '../../firebase';
import { CredenciaisLogin, DadosCadastro, Papel, UsuarioLogado } from '../models/auth.model';
import { ehSerieEscolar } from '../models/usuario.model';

const STORAGE_KEY = 'speakup.usuarioLogado';

function isUsuarioLogado(value: unknown): value is UsuarioLogado {
  if (!value || typeof value !== 'object') return false;
  const usuario = value as Partial<UsuarioLogado>;
  return (
    typeof usuario.id === 'number' &&
    typeof usuario.uid === 'string' &&
    typeof usuario.nome === 'string' &&
    typeof usuario.email === 'string' &&
    (usuario.papel === 'aluno' || usuario.papel === 'gestao')
  );
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
      if (!bruto) return null;
      const usuario: unknown = JSON.parse(bruto);
      return isUsuarioLogado(usuario) ? usuario : null;
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

  private limparSessao(): void {
    this._usuario.set(null);
    this.persistir(null);
  }

  private async buscarPapel(uid: string): Promise<Papel | null> {
    try {
      const snapshot = await get(ref(database, `usuarios/${uid}/papel`));
      const papel: unknown = snapshot.val();
      return papel === 'aluno' || papel === 'gestao' ? papel : null;
    } catch (error) {
      console.error('Erro ao consultar o papel do usuário no Realtime Database:', error);
      throw new Error('Não foi possível consultar o papel da conta no Realtime Database.');
    }
  }

  async loginAluno(credenciais: CredenciaisLogin): Promise<UsuarioLogado> {
    const result = await signInWithEmailAndPassword(auth, credenciais.email, credenciais.senha);
    let papel: Papel | null;
    try {
      papel = await this.buscarPapel(result.user.uid);
    } catch (error) {
      await signOut(auth);
      this.limparSessao();
      throw error;
    }

    const usuario: UsuarioLogado = {
      id: parseInt(result.user.uid.slice(0, 8), 16) || Date.now(),
      uid: result.user.uid,
      nome: result.user.displayName ?? result.user.email?.split('@')[0] ?? 'João Silva',
      email: result.user.email ?? credenciais.email,
      papel: papel ?? 'aluno',
    };
    this._usuario.set(usuario);
    this.persistir(usuario);
    return usuario;
  }

  async loginGestao(credenciais: CredenciaisLogin): Promise<UsuarioLogado> {
    const result = await signInWithEmailAndPassword(auth, credenciais.email, credenciais.senha);
    let papel: Papel | null;
    try {
      papel = await this.buscarPapel(result.user.uid);
    } catch (error) {
      await signOut(auth);
      this.limparSessao();
      throw error;
    }

    if (papel !== 'gestao') {
      await signOut(auth);
      this.limparSessao();
      throw new Error('Esta conta não possui permissão de gestão.');
    }

    const usuario: UsuarioLogado = {
      id: parseInt(result.user.uid.slice(0, 8), 16) || Date.now(),
      uid: result.user.uid,
      nome: result.user.displayName ?? result.user.email?.split('@')[0] ?? 'Maria Santos',
      email: result.user.email ?? credenciais.email,
      papel: 'gestao',
    };
    this._usuario.set(usuario);
    this.persistir(usuario);
    return usuario;
  }

  async registrar(dados: DadosCadastro): Promise<UsuarioLogado> {
    if (!ehSerieEscolar(dados.serie)) {
      throw new Error('Selecione uma série válida do ensino médio.');
    }

    const result = await createUserWithEmailAndPassword(auth, dados.email, dados.senha);
    const id = parseInt(result.user.uid.slice(0, 8), 16) || Date.now();
    const usuarioBanco = {
      id,
      uid: result.user.uid,
      nome: dados.nome,
      email: result.user.email ?? dados.email,
      serie: dados.serie,
      status: 'Ativo',
      ultimoAcesso: new Date().toISOString().slice(0, 10),
      papel: 'aluno',
    };
    await set(ref(database, `usuarios/${result.user.uid}`), usuarioBanco);

    const usuario: UsuarioLogado = {
      id,
      uid: result.user.uid,
      nome: dados.nome,
      email: result.user.email ?? dados.email,
      papel: 'aluno',
    };
    this._usuario.set(usuario);
    this.persistir(usuario);
    return usuario;
  }

  async recuperarSenha(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  }

  async logout(): Promise<void> {
    await signOut(auth);
    this.limparSessao();
  }
}
