import { faker } from '@faker-js/faker';
import { Usuario } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AutenticacaoInput, UsuarioInput } from '../../src/protocols';
import prisma from '../../src/config/database';

export function mockUsuarioAleatorio() {
  return {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    senha: faker.internet.password(),
    telefones: [
      {
        numero: faker.helpers.fromRegExp('[0-9]{8,9}'),
        ddd: faker.helpers.fromRegExp('[1-9]{2}'),
      },
    ],
  };
}

export function mockUsuarioDoBanco(usuario: UsuarioInput): Usuario {
  const { nome, email, senha } = usuario;
  const data = faker.date.soon();

  return {
    nome,
    email,
    senha,
    data_criacao: data,
    data_atualizacao: data,
    id: faker.string.uuid(),
  };
}

export async function insereUsuarioBanco(usuarioInput: UsuarioInput) {
  const { nome, email, senha } = usuarioInput;

  return await prisma.$transaction(async () => {
    const usuario = await prisma.usuario.create({
      data: { nome, email, senha: bcrypt.hashSync(senha, 10) },
    });

    const telefonesUsuario = usuarioInput.telefones.map((t) => {
      return { ...t, id_usuario: usuario.id };
    });

    await prisma.telefone.createMany({
      data: telefonesUsuario,
    });

    return usuario;
  });
}

export function mockToken(id_usuario: string, expired: boolean): string {
  return jwt.sign({ id: id_usuario }, process.env.JWT_SECRET, { expiresIn: expired ? 0 : 1800 }); // gera token expirado ou com tempo de 30 min
}

export function mockAutenticacao(id_usuario: string, token: string): AutenticacaoInput {
  return {
    id_usuario,
    token,
    ultimo_login: faker.date.recent(),
  };
}

export async function insereAutenticacaoBanco(autenticacao: AutenticacaoInput) {
  return prisma.autenticacao.create({
    data: autenticacao,
  });
}
