import { Request, Response } from 'express';
import { batchService } from './batch.service';
import { sendSuccess, sendPaginated } from '../../utils/response';

export class BatchController {
  async create(req: Request, res: Response): Promise<void> {
    const batch = await batchService.createBatch({
      ...req.body,
      userId: req.user!.id,
    });
    sendSuccess(res, batch, 201);
  }

  async list(req: Request, res: Response): Promise<void> {
    const result = await batchService.getBatches(req.query as any);

    if (result.isRecent) {
      sendSuccess(res, result.batches);
    } else {
      sendPaginated(res, result.batches, result.pagination!);
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    const id = req.params['id'] as string;
    const batch = await batchService.getBatchById(id);
    sendSuccess(res, batch);
  }

  async updateStatus(req: Request, res: Response): Promise<void> {
    const id = req.params['id'] as string;
    const batch = await batchService.updateBatchStatus(id, req.body, req.user!.id);
    sendSuccess(res, batch);
  }

  async archive(req: Request, res: Response): Promise<void> {
    const id = req.params['id'] as string;
    const batch = await batchService.archiveBatch(id, req.user!.id);
    sendSuccess(res, batch);
  }

  async getTraces(req: Request, res: Response): Promise<void> {
    const id = req.params['id'] as string;
    const events = await batchService.getTraceEvents(id);
    sendSuccess(res, events);
  }
}

export const batchController = new BatchController();
