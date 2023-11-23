import { Router } from 'express';
import { usuarioController } from '@/controllers/usuario-controller';
import { validateSchemaMiddleware } from '@/middlewares/schema-validation-middleware';
import { usuarioSchema } from '@/schemas/usuario-schema';

const usuarioRouter = Router();

usuarioRouter.post('/usuario', validateSchemaMiddleware(usuarioSchema), usuarioController.create);

export default usuarioRouter;
