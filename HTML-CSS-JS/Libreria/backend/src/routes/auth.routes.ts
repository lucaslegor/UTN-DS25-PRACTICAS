import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validate } from '../middlewares/validation.middleware';
import { loginSchema, registerSchema } from '../validations/auth.validations';

const router = Router();

// Rutas públicas
router.post('/login', validate(loginSchema), authController.login);
router.post('/register', validate(registerSchema), authController.register);

export const authRoutes = router;