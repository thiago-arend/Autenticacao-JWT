import { ApplicationError } from '../middlewares/error-middleware';

export function recursoInexistente(): ApplicationError {
  return {
    name: 'RecursoInexistenteError',
    message: 'Esse recurso não existe',
  };
}
