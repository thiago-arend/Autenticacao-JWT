import { Usuario, Telefone, Autenticacao } from '@prisma/client';

type TelefoneInput = Omit<Telefone, 'id' | 'data_criacao' | 'data_atualizacao' | 'id_usuario'>;

export type UsuarioInput = Omit<Usuario, 'id' | 'data_criacao' | 'data_atualizacao'> & {
  telefones: TelefoneInput[];
};

export type AutenticacaoInput = Omit<Autenticacao, 'id' | 'data_criacao' | 'data_atualizacao'>;

export type LoginInput = Omit<Usuario, 'id' | 'data_criacao' | 'data_atualizacao' | 'nome' | 'ultimo_login'>;
