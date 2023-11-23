import { Router } from 'express';
import { validateSchemaMiddleware } from '@/middlewares/schema-validation-middleware';
import { authController } from '@/controllers/auth-controller';
import { authSchema } from '@/schemas/auth-schema';

const authRouter = Router();

authRouter.post('/login', validateSchemaMiddleware(authSchema), authController.login);

export default authRouter;
