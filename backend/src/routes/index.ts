import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { batchRoutes } from '../modules/batches/batch.routes';
import { dashboardRoutes } from '../modules/dashboard/dashboard.routes';

export const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/batches', batchRoutes);
routes.use('/dashboard', dashboardRoutes);
