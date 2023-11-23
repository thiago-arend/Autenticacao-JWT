import joi from 'joi';
import { UsuarioInput } from '@/protocols';

export const usuarioSchema = joi.object<UsuarioInput>({
  nome: joi.string().required(),
  email: joi.string().email().required(),
  senha: joi.string().required(),
  telefones: joi
    .array()
    .required()
    .items(
      joi.object({
        numero: joi.string().min(8).max(9).required(),
        ddd: joi.string().pattern(new RegExp('^[1-9]{2}$')).required(),
      }),
    ),
});
