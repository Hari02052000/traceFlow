import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler';
import { validate } from '../../middlewares/validate.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/role.middleware';
import { batchController } from './batch.controller';
import { createBatchSchema, updateStatusSchema, batchListQuerySchema } from './batch.validation';

const router = Router();

router.use(authMiddleware);

router.get('/', validate(batchListQuerySchema, 'query'), asyncHandler(batchController.list));
router.get('/:id', asyncHandler(batchController.getById));
router.get('/:id/traces', asyncHandler(batchController.getTraces));
router.post('/', requireRole('ADMIN'), validate(createBatchSchema), asyncHandler(batchController.create));
router.patch('/:id/status', requireRole('OPERATOR'), validate(updateStatusSchema), asyncHandler(batchController.updateStatus));
router.patch('/:id/archive', requireRole('ADMIN'), asyncHandler(batchController.archive));

export { router as batchRoutes };
