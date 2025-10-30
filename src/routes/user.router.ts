import { Router } from 'express';
import { getMe, updateInterests, getUserById, getSuggestedUsers, uploadUserPhotos } from '../controllers/user.controller';
import authenticate from '../middlewares/auth';
import upload from '../libs/multer';

const router = Router();

router.get('/me', authenticate, getMe);
router.put('/me/interests', authenticate, updateInterests);
router.get('/suggested', authenticate, getSuggestedUsers);
router.get('/:id', authenticate, getUserById);
router.post('/:id/photos', authenticate, upload.array('photos', 10), uploadUserPhotos);

export default router;
