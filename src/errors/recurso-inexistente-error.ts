import { ApplicationError } from '@/middlewares/error-middleware';

export function recursoInexistente(): ApplicationError {
  return {
    name: 'RecursoInexistenteError',
    message: 'O recurso buscado não existe',
  };
}
