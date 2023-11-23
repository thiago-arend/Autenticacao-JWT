import { ApplicationError } from '../middlewares/error-middleware';

export function tokenInvalido(): ApplicationError {
  return {
    name: 'TokenInvalidoError',
    message: 'Não autorizado',
  };
}
