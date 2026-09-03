import { Injectable, computed, signal } from '@angular/core';
import { onValue, ref, set } from 'firebase/database';
import { SerieEscolar, Usuario } from '../models/usuario.model';
import { database } from '../../firebase';

const DADOS_INICIAIS: Usuario[] = [
  { id: 1, nome: 'João Silva', email: 'joao.silva@email.com', matricula: '12345', serie: '9° Ano', status: 'Ativo', ultimoAcesso: '2026-06-02' },
  { id: 2, nome: 'Maria Santos', email: 'maria.santos@email.com', matricula: '12346', serie: '8° Ano', status: 'Ativo', ultimoAcesso: '2026-06-01' },
  { id: 3, nome: 'Pedro Costa', email: 'pedro.costa@email.com', matricula: '12347', serie: '1° EM', status: 'Ativo', ultimoAcesso: '2026-05-31' },
  { id: 4, nome: 'Ana Lima', email: 'ana.lima@email.com', matricula: '12348', serie: '2° EM', status: 'Ativo', ultimoAcesso: '2026-05-29' },
  { id: 5, nome: 'Carlos Souza', email: 'carlos.souza@email.com', matricula: '12349', serie: '7° Ano', status: 'Inativo', ultimoAcesso: '2026-04-14' },
];

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private readonly _usuarios = signal<Usuario[]>(DADOS_INICIAIS);
  readonly usuarios = this._usuarios.asReadonly();

  constructor() {
    onValue(ref(database, 'usuarios'), (snapshot) => {
      const dados = snapshot.val() as Record<string, Usuario> | null;
      if (dados) {
        this._usuarios.set(Object.values(dados).sort((a, b) => a.id - b.id));
      }
    });
  }

  readonly total = computed(() => this._usuarios().length);
  readonly ativos = computed(() => this._usuarios().filter((u) => u.status === 'Ativo').length);
  readonly inativos = computed(() => this._usuarios().filter((u) => u.status === 'Inativo').length);

  adicionar(dados: { nome: string; email: string; matricula: string; serie: SerieEscolar }): Usuario {
    const novo: Usuario = {
      id: Math.max(0, ...this._usuarios().map((u) => u.id)) + 1,
      ...dados,
      status: 'Ativo',
      ultimoAcesso: new Date().toISOString().slice(0, 10),
    };
    this._usuarios.update((lista) => [...lista, novo]);
    void this.persistir();
    return novo;
  }

  alternarStatus(id: number): void {
    this._usuarios.update((lista) =>
      lista.map((u) => (u.id === id ? { ...u, status: u.status === 'Ativo' ? 'Inativo' : 'Ativo' } : u)),
    );
    void this.persistir();
  }

  remover(id: number): void {
    this._usuarios.update((lista) => lista.filter((u) => u.id !== id));
    void this.persistir();
  }

  private async persistir(): Promise<void> {
    await set(ref(database, 'usuarios'), Object.fromEntries(this._usuarios().map((usuario) => [usuario.id, usuario])));
  }
}
