import prisma from '../config/database';
import { AutenticacaoInput } from '../protocols';

function create(autenticacao: AutenticacaoInput) {
  return prisma.autenticacao.create({
    data: autenticacao,
  });
}

function getLastAutentication(id_usuario: string) {
  return prisma.autenticacao.findFirst({
    where: { id_usuario },
    orderBy: {
      data_criacao: { sort: 'desc' },
    },
  });
}

export const authRepository = {
  create,
  getLastAutentication,
};
