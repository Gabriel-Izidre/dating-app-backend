import { Router } from 'express';
import { getUserMatches } from '../controllers/match.controller';
import authenticate from '../middlewares/auth';

const router = Router();

router.get('/user/:userId', authenticate, getUserMatches);

export default router;
