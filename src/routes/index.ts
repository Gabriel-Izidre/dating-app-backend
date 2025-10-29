import { Router } from 'express';
import actionRouter from './action.router';
import authRouter from './auth.router';
import interestRouter from './interest.router';
import matchRouter from './match.router';
import userRouter from './user.router';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Funcionou' });
});

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/interests', interestRouter);
router.use('/actions', actionRouter);
router.use('/matches', matchRouter);

export default router;
