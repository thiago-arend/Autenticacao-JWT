import { ApplicationError } from '@/middlewares/error-middleware';

export function tokenExpiradoError(): ApplicationError {
  return {
    name: 'TokenExpiradoError',
    message: 'Sessão inválida',
  };
}
