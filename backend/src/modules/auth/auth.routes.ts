import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler';
import { validate } from '../../middlewares/validate.middleware';
import { registerSchema, loginSchema } from './auth.validation';
import { authController } from './auth.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/register', validate(registerSchema), asyncHandler(authController.register));
router.post('/login', validate(loginSchema), asyncHandler(authController.login));
router.post('/logout', authMiddleware, (req, res) => authController.logout(req, res));
router.get('/me', authMiddleware, asyncHandler(authController.me));

export { router as authRoutes };
