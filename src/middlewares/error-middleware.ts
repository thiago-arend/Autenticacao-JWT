import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export type ApplicationError = {
  name: string;
  message: string;
};

const errors = {
  ['NotFoundError']: httpStatus.NOT_FOUND,
};

export default function handleApplicationErrors(
  err: ApplicationError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  if (errors[err.name]) {
    return res.status(errors[err.name]).send({
      mensagem: err.message,
    });
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    mensagem: 'Erro interno do servidor',
  });
}
