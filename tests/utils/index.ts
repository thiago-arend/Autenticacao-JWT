import prisma from '../../src/config/database';

export async function cleanDb() {
  await prisma.telefone.deleteMany();
  await prisma.autenticacao.deleteMany();
  await prisma.usuario.deleteMany();
}
