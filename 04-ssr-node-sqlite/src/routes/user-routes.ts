import { Router } from 'express';
import { signup } from '../controllers/signup/signup-controller';
import { login } from '../controllers/login/login-controller';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;
