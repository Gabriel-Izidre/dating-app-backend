import { Router } from 'express';
import authRouter from './auth.router';

const routes = Router();

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Funcionou' });
});

routes.use('/auth', authRouter);

export default routes;
