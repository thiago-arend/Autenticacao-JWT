import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import { dadosEntradaInvalidos } from '@/errors';

export function validateSchemaMiddleware(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body);
    if (validation.error) throw dadosEntradaInvalidos();

    next();
  };
}
