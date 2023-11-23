import { ApplicationError } from '@/middlewares/error-middleware';

export function usuarioOuSenhaInvalidos(): ApplicationError {
  return {
    name: 'UsuarioOuSenhaInvalidosError',
    message: 'Usuário e/ou senha inválidos',
  };
}
