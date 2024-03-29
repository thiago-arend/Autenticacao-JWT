import express, { json, Request, Response } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
import httpStatus from 'http-status';
import usuarioRouter from './routers/usuario-router';
import authRouter from './routers/auth-router';
import handleApplicationErrors from './middlewares/error-middleware';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.get('/health', (req: Request, res: Response) => {
  return res.status(httpStatus.OK).send("I'm ok!");
});
app.use(usuarioRouter);
app.use(authRouter);
app.use(handleApplicationErrors);

export default app;
