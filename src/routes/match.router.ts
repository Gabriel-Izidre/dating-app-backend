import { Router } from 'express';
import { createMatch, getMatches, getUserMatches } from '../controllers/match.controller';
import authenticate from '../middlewares/auth';

const router = Router();

router.post('/', authenticate, createMatch);
router.get('/', authenticate, getMatches);
router.get('/user/:userId', authenticate, getUserMatches);

export default router;
