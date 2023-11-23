import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt, { DecodeOptions, VerifyErrors } from 'jsonwebtoken';
import { tokenInvalido } from '@/errors/token-invalido-error';
import { tokenExpiradoError } from '@/errors/token-expirado-error';

dotenv.config();

export function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) throw tokenInvalido();

  const parts = authorization.split(' ');
  if (parts.length !== 2) throw tokenInvalido();

  const [schema, token] = parts;
  if (schema !== 'Bearer') throw tokenInvalido();

  jwt.verify(
    token,
    process.env.JWT_SECRET,
    (
      error: VerifyErrors,
      decoded: DecodeOptions, // eslint-disable-line @typescript-eslint/no-unused-vars
    ) => {
      if (error) {
        if (error.name === 'TokenExpiredError') throw tokenExpiradoError();
        if (error.name === 'JsonWebTokenError') throw tokenInvalido();
      }
    },
  );

  next();
}
