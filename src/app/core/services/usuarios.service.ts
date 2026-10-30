import { Injectable, computed, signal } from '@angular/core';
import { onAuthStateChanged } from 'firebase/auth';
import { onValue, ref, remove, set, Unsubscribe } from 'firebase/database';
import { ehSerieEscolar, ehUsuarioGestao, SerieEscolar, Usuario } from '../models/usuario.model';
import { auth, database } from '../../firebase';

function isUsuario(value: unknown): value is Usuario {
  if (!value || typeof value !== 'object') return false;
  const usuario = value as Partial<Usuario>;
  return (
    typeof usuario.id === 'number' &&
    (usuario.uid === undefined || typeof usuario.uid === 'string') &&
    typeof usuario.nome === 'string' &&
    typeof usuario.email === 'string' &&
    ehSerieEscolar(usuario.serie) &&
    (usuario.status === 'Ativo' || usuario.status === 'Inativo') &&
    typeof usuario.ultimoAcesso === 'string' &&
    (usuario.papel === undefined || typeof usuario.papel === 'string')
  );
}

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private readonly _usuarios = signal<Usuario[]>([]);
  private readonly _carregando = signal(true);
  private readonly _erroAoCarregar = signal(false);
  private readonly chavesBanco = new Map<number, string>();
  private unsubscribeUsuarios?: Unsubscribe;
  readonly usuarios = this._usuarios.asReadonly();
  readonly carregando = this._carregando.asReadonly();
  readonly erroAoCarregar = this._erroAoCarregar.asReadonly();

  constructor() {
    onAuthStateChanged(auth, (usuarioAutenticado) => {
      this.unsubscribeUsuarios?.();
      this.unsubscribeUsuarios = undefined;
      this._usuarios.set([]);
      this.chavesBanco.clear();
      this._erroAoCarregar.set(false);

      if (!usuarioAutenticado) {
        this._carregando.set(false);
        return;
      }

      this._carregando.set(true);
      this.unsubscribeUsuarios = onValue(ref(database, 'usuarios'), (snapshot) => {
        const dados = snapshot.val() as Record<string, unknown> | null;
        const usuarios = dados
          ? Object.entries(dados).flatMap(([chave, valor]): [string, Usuario][] => {
              if (!isUsuario(valor) || ehUsuarioGestao(valor)) return [];
              const usuario: Usuario = {
                id: valor.id,
                ...(valor.uid === undefined ? {} : { uid: valor.uid }),
                nome: valor.nome,
                email: valor.email,
                serie: valor.serie,
                status: valor.status,
                ultimoAcesso: valor.ultimoAcesso,
                ...(valor.papel === undefined ? {} : { papel: valor.papel }),
              };
              return [[chave, usuario]];
            })
          : [];
        this.chavesBanco.clear();
        for (const [chave, usuario] of usuarios) this.chavesBanco.set(usuario.id, chave);
        this._usuarios.set(usuarios.map(([, usuario]) => usuario).sort((a, b) => a.id - b.id));
        this._carregando.set(false);
        this._erroAoCarregar.set(false);
      }, (error) => {
        this._carregando.set(false);
        this._erroAoCarregar.set(true);
        console.error('Erro ao carregar usuários:', error);
      });
    });
  }

  readonly total = computed(() => this._usuarios().length);
  readonly ativos = computed(() => this._usuarios().filter((u) => u.status === 'Ativo').length);
  readonly inativos = computed(() => this._usuarios().filter((u) => u.status === 'Inativo').length);

  adicionar(dados: { nome: string; email: string; serie: SerieEscolar }): Usuario {
    const novo: Usuario = {
      id: Math.max(0, ...this._usuarios().map((u) => u.id)) + 1,
      ...dados,
      status: 'Ativo',
      ultimoAcesso: new Date().toISOString().slice(0, 10),
    };
    this._usuarios.update((lista) => [...lista, novo]);
    void this.persistirUsuario(novo).catch((error) => console.error('Erro ao salvar usuário:', error));
    return novo;
  }

  alternarStatus(id: number): void {
    let atualizado: Usuario | undefined;
    this._usuarios.update((lista) =>
      lista.map((u) => {
        if (u.id !== id) return u;
        atualizado = { ...u, status: u.status === 'Ativo' ? 'Inativo' : 'Ativo' };
        return atualizado;
      }),
    );
    if (atualizado) {
      void this.persistirUsuario(atualizado).catch((error) => console.error('Erro ao atualizar usuário:', error));
    }
  }

  remover(id: number): void {
    this._usuarios.update((lista) => lista.filter((u) => u.id !== id));
    void this.persistirRemocao(id).catch((error) => console.error('Erro ao remover usuário:', error));
  }

  private async persistirUsuario(usuario: Usuario): Promise<void> {
    const chave = this.chavesBanco.get(usuario.id) ?? String(usuario.id);
    await set(ref(database, `usuarios/${chave}`), usuario);
    this.chavesBanco.set(usuario.id, chave);
  }

  private async persistirRemocao(id: number): Promise<void> {
    const chave = this.chavesBanco.get(id) ?? String(id);
    await remove(ref(database, `usuarios/${chave}`));
    this.chavesBanco.delete(id);
  }
}
