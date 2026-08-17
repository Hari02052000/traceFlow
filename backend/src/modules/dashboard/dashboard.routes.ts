import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { dashboardController } from './dashboard.controller';

const router = Router();

router.use(authMiddleware);
router.get('/stats', asyncHandler(dashboardController.getStats));

export { router as dashboardRoutes };
