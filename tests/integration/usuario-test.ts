import supertest from 'supertest';
import httpStatus from 'http-status';
import app from '../../src/app';
import { cleanDb } from '../utils/index';
import { insereUsuarioBanco, mockUsuarioAleatorio } from '../../tests/factories/usuario-factory';
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

  describe('POST /login', () => {
    it('deve retornar 422 caso tente logar com campos inválidos', async () => {
      const { status } = await api.post('/login').send({});

      expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('deve retornar 200 e um objeto se um usuario logou com sucesso', async () => {
      const usuarioInput = mockUsuarioAleatorio();
      const usuarioDoBanco = await insereUsuarioBanco(usuarioInput);

      const { email, senha } = usuarioInput;
      const { status, body } = await api.post('/login').send({ email, senha });

      expect(status).toBe(httpStatus.OK);
      expect(body).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          data_criacao: expect.any(String),
          data_atualizacao: expect.any(String),
          ultimo_login: expect.any(String),
          token: expect.any(String),
        }),
      );

      const autenticacaoPersistiu = await prisma.autenticacao.findUnique({
        where: { id: body.id },
      });

      expect(autenticacaoPersistiu).not.toBeNull();
      expect(body).toEqual({
        id: autenticacaoPersistiu.id,
        data_criacao: autenticacaoPersistiu.data_criacao.toISOString(),
        data_atualizacao: autenticacaoPersistiu.data_atualizacao.toISOString(),
        ultimo_login: usuarioDoBanco.data_criacao.toISOString(),
        token: expect.any(String),
      });
    });
  });
});
