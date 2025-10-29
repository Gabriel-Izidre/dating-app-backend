import { Router } from 'express';
import { createAction } from '../controllers/action.controller';

const router = Router();

router.post('/', createAction);

export default router;
