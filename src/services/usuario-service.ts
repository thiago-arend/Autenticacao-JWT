import bcrypt from 'bcrypt';
import { authService } from './auth-service';
import { UsuarioInput } from '@/protocols';
import { usuarioRepository } from '@/repositories/usuario-repository';
import { emailExistente, recursoInexistente } from '@/errors';
import { authRepository } from '@/repositories/auth-repository';

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
    ultimo_login: usuario.data_criacao, // usa a data de criação do usuário como data do último login
    token: authService.generateToken(usuario.id), // gera um token para compor a resposta
  };
}

export async function getAllInformation(id: string) {
  const usuario = await usuarioRepository.getAllInformation(id);
  if (!usuario) throw recursoInexistente();
  const { token } = usuario.autenticacoes[0];

  const lstTelefonesFormatada = usuario.telefones.map((t) => {
    return { numero: t.numero, ddd: t.ddd };
  });

  const { data_criacao } = await authRepository.getLastAutentication(usuario.id);

  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    token,
    ultimo_login: data_criacao,
    telefones: lstTelefonesFormatada,
  };
}

export const usuarioService = {
  create,
  getAllInformation,
};
