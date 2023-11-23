import supertest from 'supertest';
import httpStatus from 'http-status';
import app from '../../src/app';
import { cleanDb } from '../utils/index';
import { mockUsuarioAleatorio } from '../../tests/factories/usuario-factory';
import prisma from '../../src/config/database';

beforeEach(async () => {
  await cleanDb();
});

const api = supertest(app);

describe('Testes de integração da aplicação', () => {
  describe('POST /usuario', () => {
    it('deve retornar 422 caso tente criar usuario com campos inválidos', async () => {
      const { status } = await api.post('/usuario').send({});

      expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('deve retornar 201 e um objeto se um usuario pôde ser criado', async () => {
      const usuarioInput = mockUsuarioAleatorio();
      const { status, body } = await api.post('/usuario').send(usuarioInput);

      expect(status).toBe(httpStatus.CREATED);
      expect(body).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          data_criacao: expect.any(String),
          data_atualizacao: expect.any(String),
          ultimo_login: expect.any(String),
          token: expect.any(String),
        }),
      );

      const usuarioPersistiu = await prisma.usuario.findUnique({
        where: { id: body.id },
      });

      expect(usuarioPersistiu).not.toBeNull();
      expect(body).toEqual({
        id: usuarioPersistiu.id,
        data_criacao: usuarioPersistiu.data_criacao.toISOString(),
        data_atualizacao: usuarioPersistiu.data_atualizacao.toISOString(),
        ultimo_login: usuarioPersistiu.data_criacao.toISOString(),
        token: expect.any(String),
      });
    });
  });
});
