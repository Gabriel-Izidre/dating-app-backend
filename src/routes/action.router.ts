import { Router } from 'express';
import { createAction } from '../controllers/action.controller';
import { actionSchema } from '../schemas/action.schema';
import validate from '../middlewares/validate';
import authenticate from '../middlewares/auth';

const router = Router();

router.post('/create', authenticate, validate(actionSchema), createAction);

export default router;
