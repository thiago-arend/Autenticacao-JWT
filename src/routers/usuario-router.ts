import { Router } from 'express';
import { usuarioController } from '@/controllers/usuario-controller';
import { validateSchemaMiddleware } from '@/middlewares/schema-validation-middleware';
import { usuarioSchema } from '@/schemas/usuario-schema';
import { authenticationMiddleware } from '@/middlewares/auth-middleware';

const usuarioRouter = Router();

usuarioRouter.post('/usuario', validateSchemaMiddleware(usuarioSchema), usuarioController.create);
usuarioRouter.get('/usuario/:id', authenticationMiddleware, usuarioController.getAllInformation);

export default usuarioRouter;
