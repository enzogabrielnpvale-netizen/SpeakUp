export type Papel = 'aluno' | 'gestao';

export interface UsuarioLogado {
  id: number;
  uid: string;
  nome: string;
  email: string;
  papel: Papel;
}

export interface CredenciaisLogin {
  email: string;
  senha: string;
  lembrarMe: boolean;
}

export interface DadosCadastro {
  nome: string;
  email: string;
  serie: string;
  senha: string;
  confirmarSenha: string;
}
