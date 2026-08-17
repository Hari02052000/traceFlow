import { AppError } from '../../errors/app-error';
import { batchRepository } from './batch.repository';
import { traceEventRepository } from './trace-event.repository';
import { BatchStatus } from './batch.model';
import { STATUS_TRANSITIONS } from './batch.types';

export class BatchService {
  async createBatch(data: {
    batchNumber: string;
    productName: string;
    origin: string;
    quantity: number;
    unit: string;
    userId: string;
  }) {
    const existing = await batchRepository.findByBatchNumber(data.batchNumber);
    if (existing) {
      throw new AppError('Batch number already exists', 409, 'DUPLICATE_BATCH_NUMBER');
    }

    const batch = await batchRepository.create({
      ...data,
      currentStatus: 'HARVESTED',
      createdBy: data.userId,
    });

    await traceEventRepository.create({
      batchId: batch._id.toString(),
      status: 'HARVESTED',
      location: data.origin,
      notes: 'Batch created',
      updatedBy: data.userId,
    });

    return this.formatBatch(batch);
  }

  async updateBatchStatus(
    batchId: string,
    data: { status: BatchStatus; location: string; notes: string },
    userId: string
  ) {
    const batch = await batchRepository.findById(batchId);
    if (!batch) {
      throw new AppError('Batch not found', 404, 'BATCH_NOT_FOUND');
    }

    const allowedNext = STATUS_TRANSITIONS[batch.currentStatus];
    if (allowedNext === null) {
      throw new AppError('This batch cannot be updated', 400, 'INVALID_STATUS_TRANSITION');
    }
    if (allowedNext !== data.status) {
      throw new AppError(
        `Cannot transition from ${batch.currentStatus} to ${data.status}`,
        400,
        'INVALID_STATUS_TRANSITION'
      );
    }

    const updated = await batchRepository.updateStatus(batchId, data.status);

    await traceEventRepository.create({
      batchId,
      status: data.status,
      location: data.location,
      notes: data.notes,
      updatedBy: userId,
    });

    return this.formatBatch(updated!);
  }

  async archiveBatch(batchId: string, userId: string) {
    const batch = await batchRepository.findById(batchId);
    if (!batch) {
      throw new AppError('Batch not found', 404, 'BATCH_NOT_FOUND');
    }

    if (batch.currentStatus === 'ARCHIVED') {
      throw new AppError('Batch is already archived', 400, 'ALREADY_ARCHIVED');
    }

    const updated = await batchRepository.updateStatus(batchId, 'ARCHIVED');

    await traceEventRepository.create({
      batchId,
      status: 'ARCHIVED',
      location: 'System',
      notes: 'Batch archived',
      updatedBy: userId,
    });

    return this.formatBatch(updated!);
  }

  async getBatches(query: {
    page?: number;
    limit?: number;
    search?: string;
    status?: BatchStatus;
    sort?: string;
    order?: 'asc' | 'desc';
  }) {
    if (query.sort || query.order) {
      const sort = query.sort || 'createdAt';
      const order = query.order || 'desc';
      const batches = await batchRepository.findRecent(query.limit || 5, sort, order);
      return { batches: batches.map((b) => this.formatBatch(b)), isRecent: true };
    }

    const page = query.page || 1;
    const limit = query.limit || 10;
    const { batches, total } = await batchRepository.findMany(
      { search: query.search, status: query.status },
      page,
      limit
    );

    return {
      batches: batches.map((b) => this.formatBatch(b)),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
      isRecent: false,
    };
  }

  async getBatchById(id: string) {
    const batch = await batchRepository.findById(id);
    if (!batch) {
      throw new AppError('Batch not found', 404, 'BATCH_NOT_FOUND');
    }
    return this.formatBatch(batch);
  }

  async getTraceEvents(batchId: string) {
    const batch = await batchRepository.findById(batchId);
    if (!batch) {
      throw new AppError('Batch not found', 404, 'BATCH_NOT_FOUND');
    }

    const events = await traceEventRepository.findByBatchId(batchId);
    return events.map((e: any) => ({
      id: e._id.toString(),
      batchId: e.batchId.toString(),
      status: e.status,
      location: e.location,
      notes: e.notes,
      timestamp: e.createdAt.toISOString(),
      recordedBy: e.updatedBy
        ? { id: e.updatedBy._id?.toString() ?? e.updatedBy.toString(), name: e.updatedBy.name, role: e.updatedBy.role }
        : undefined,
    }));
  }

  private formatBatch(batch: any) {
    return {
      id: batch._id.toString(),
      batchNumber: batch.batchNumber,
      productName: batch.productName,
      origin: batch.origin,
      quantity: batch.quantity,
      unit: batch.unit,
      currentStatus: batch.currentStatus,
      createdAt: batch.createdAt.toISOString(),
      updatedAt: batch.updatedAt.toISOString(),
    };
  }
}

export const batchService = new BatchService();
