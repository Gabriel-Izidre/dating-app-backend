import { Router } from 'express';
import multer from 'multer';
import { createUser, loginUser } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

const upload = multer({ dest: 'uploads/tmp/' });
const router = Router();

router.post('/register', upload.single('profilePhoto'), validate(registerSchema), createUser);

router.post('/login', validate(loginSchema), loginUser);

export default router;
