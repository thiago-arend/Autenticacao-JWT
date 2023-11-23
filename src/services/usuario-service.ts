import bcrypt from 'bcrypt';
import { UsuarioInput } from '@/protocols';
import { usuarioRepository } from '@/repositories/usuario-repository';
import { emailExistente } from '@/errors';

export async function create(usuarioInput: UsuarioInput) {
  const usuarioExiste = await usuarioRepository.getByEmail(usuarioInput.email);
  if (usuarioExiste) throw emailExistente();

  const inputFormatado = {
    ...usuarioInput,
    senha: bcrypt.hashSync(usuarioInput.senha, 10),
  };

  const usuario = await usuarioRepository.create(inputFormatado);
  const { id, data_criacao, data_atualizacao } = usuario;

  return {
    id,
    data_criacao,
    data_atualizacao,
    ultimo_login: null,
    token: null,
  };
}

export const usuarioService = {
  create,
};
