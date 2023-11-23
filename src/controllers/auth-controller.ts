import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { LoginInput } from '@/protocols';
import { authService } from '@/services/auth-service';

export async function login(req: Request, res: Response) {
  const loginInput = req.body as LoginInput;
  const resposta = await authService.login(loginInput);

  res.status(httpStatus.OK).send(resposta);
}

export const authController = {
  login,
};
