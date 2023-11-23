import prisma from '@/config/database';
import { UsuarioInput } from '@/protocols';

async function create(usuarioInput: UsuarioInput) {
  const { nome, email, senha } = usuarioInput;

  return await prisma.$transaction(async () => {
    const usuario = await prisma.usuario.create({
      data: { nome, email, senha },
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

async function getByEmail(email: string) {
  return prisma.usuario.findUnique({
    where: { email },
  });
}

export const usuarioRepository = {
  create,
  getByEmail,
};
