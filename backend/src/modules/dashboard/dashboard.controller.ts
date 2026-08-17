import { Request, Response } from 'express';
import { batchRepository } from '../batches/batch.repository';
import { sendSuccess } from '../../utils/response';

export class DashboardController {
  async getStats(req: Request, res: Response): Promise<void> {
    const [totalBatches, inTransit, delivered] = await Promise.all([
      batchRepository.countAll(),
      batchRepository.countByStatus('IN_TRANSIT'),
      batchRepository.countByStatus('DELIVERED'),
    ]);

    sendSuccess(res, { totalBatches, inTransit, delivered });
  }
}

export const dashboardController = new DashboardController();
