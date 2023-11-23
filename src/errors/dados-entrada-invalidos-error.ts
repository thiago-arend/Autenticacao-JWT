import { ApplicationError } from '@/middlewares/error-middleware';

export function dadosEntradaInvalidos(): ApplicationError {
  return {
    name: 'DadosEntradaInvalidosError',
    message: 'Os dados fornecidos são inválidos',
  };
}
