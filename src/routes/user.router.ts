import { Router } from 'express';
import { getMe, updateInterests } from '../controllers/user.controller';
import authenticate from '../middlewares/auth';

const router = Router();

router.get('/me', authenticate, getMe);
router.put('/me/interests', authenticate, updateInterests);

export default router;
