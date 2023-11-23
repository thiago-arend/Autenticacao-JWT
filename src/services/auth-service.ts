import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { usuarioRepository } from '@/repositories/usuario-repository';
import { usuarioOuSenhaInvalidos } from '@/errors';
import { authRepository } from '@/repositories/auth-repository';
import { LoginInput } from '@/protocols';

export async function login(loginInput: LoginInput) {
  const usuario = await usuarioRepository.getByEmail(loginInput.email);
  if (!usuario || !bcrypt.compareSync(loginInput.senha, usuario.senha)) throw usuarioOuSenhaInvalidos();

  const token = generateToken(usuario.id); // gera token JWT
  const ultimaAutenticacao = await authRepository.getLastAutentication(usuario.id); // busca última autenticação; caso não encontre, devolve null
  const autenticacaoAtual = await authRepository.create({
    ultimo_login: ultimaAutenticacao?.data_criacao,
    id_usuario: usuario.id,
    token,
  });

  delete autenticacaoAtual.id_usuario;

  return autenticacaoAtual;
}

function generateToken(id: string): string {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 1800 }); // expira em 30 min (1800 seg)
}

export const authService = {
  login,
};
