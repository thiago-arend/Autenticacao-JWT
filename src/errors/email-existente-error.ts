import { ApplicationError } from '../middlewares/error-middleware';

export function emailExistente(): ApplicationError {
  return {
    name: 'EmailExistenteError',
    message: 'E-mail já existente',
  };
}
