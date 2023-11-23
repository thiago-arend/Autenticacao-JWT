import { emailExistente, usuarioOuSenhaInvalidos } from '../../src/errors';
import { usuarioRepository } from '../../src/repositories/usuario-repository';
import { usuarioService } from '../../src/services/usuario-service';
import { mockUsuarioAleatorio, mockUsuarioDoBanco } from '../factories/usuario-factory';
import { authService } from '../../src/services/auth-service';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Testes de unidade da aplicação', () => {
  describe('Ao tentar criar um usuário', () => {
    it("deve retornar 409 e a mensagem 'E-mail já existente' caso o e-mail já exista", () => {
      const usuario = mockUsuarioAleatorio();
      jest.spyOn(usuarioRepository, 'getByEmail').mockResolvedValueOnce(mockUsuarioDoBanco(usuario));

      const promise = usuarioService.create(usuario);

      expect(promise).rejects.toEqual(emailExistente());
    });
  });

  describe('Ao tentar logar um usuário', () => {
    it("deve retornar 401 e a mensagem 'Usuário e/ou senha inválidos' em caso de e-mail não cadastrado", () => {
      const { email, senha } = mockUsuarioAleatorio();
      jest.spyOn(usuarioRepository, 'getByEmail').mockResolvedValueOnce(null);

      const promise = authService.login({ email, senha });

      expect(promise).rejects.toEqual(usuarioOuSenhaInvalidos());
    });

    it("deve retornar 401 e a mensagem 'Usuário e/ou senha inválidos' em caso de senha incorreta", () => {
      const usuarioInput = mockUsuarioAleatorio();
      const usuarioDoBanco = mockUsuarioDoBanco(usuarioInput);
      jest.spyOn(usuarioRepository, 'getByEmail').mockResolvedValueOnce(usuarioDoBanco);

      const promise = authService.login({ email: usuarioInput.email, senha: 'senha falsa' });

      expect(promise).rejects.toEqual(usuarioOuSenhaInvalidos());
    });
  });
});
