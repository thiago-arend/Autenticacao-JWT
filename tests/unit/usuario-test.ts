import { emailExistente } from '../../src/errors';
import { usuarioRepository } from '../../src/repositories/usuario-repository';
import { usuarioService } from '../../src/services/usuario-service';
import { mockUsuarioAleatorio, mockUsuarioDoBanco } from '../factories/usuario-factory';

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
});
