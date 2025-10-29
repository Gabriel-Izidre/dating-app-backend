import { Router } from 'express';
import { createUser, loginUser } from '../controllers/auth.controller';
import upload from '../libs/multer';
import { validate } from '../middlewares/validate';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

const router = Router();

router.post('/register', upload.single('profilePhoto'), validate(registerSchema), createUser);
router.post('/login', validate(loginSchema), loginUser);

export default router;
