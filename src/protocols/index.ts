import { Usuario, Telefone } from '@prisma/client';

type TelefoneInput = Omit<Telefone, 'id' | 'data_criacao' | 'data_atualizacao' | 'id_usuario'>;

export type UsuarioInput = Omit<Usuario, 'id' | 'data_criacao' | 'data_atualizacao'> & {
  telefones: TelefoneInput[];
};
