import { faker } from '@faker-js/faker';
import { Usuario } from '@prisma/client';
import { UsuarioInput } from '@/protocols';

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
