import { Router } from 'express';
import { getInterests } from '../controllers/interest.controller';
import authenticate from '../middlewares/auth';

const router = Router();

router.get('/', authenticate, getInterests);

export default router;
