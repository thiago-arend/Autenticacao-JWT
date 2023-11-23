import joi from 'joi';
import { LoginInput } from '@/protocols';

export const authSchema = joi.object<LoginInput>({
  email: joi.string().email().required(),
  senha: joi.string().required(),
});
