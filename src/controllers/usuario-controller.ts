import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { UsuarioInput } from '@/protocols';
import { usuarioService } from '@/services/usuario-service';

export async function create(req: Request, res: Response) {
  const usuarioInput = req.body as UsuarioInput;
  const resposta = await usuarioService.create(usuarioInput);

  res.status(httpStatus.CREATED).send(resposta);
}

export async function getAllInformation(req: Request, res: Response) {
  const { id } = req.params;

  const resposta = await usuarioService.getAllInformation(id);

  res.status(httpStatus.OK).send(resposta);
}

export const usuarioController = {
  create,
  getAllInformation,
};
