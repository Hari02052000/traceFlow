import { Batch, IBatch, BatchStatus } from './batch.model';

export interface BatchListFilter {
  search?: string;
  status?: BatchStatus;
}

export interface BatchSortOptions {
  sort?: string;
  order?: 'asc' | 'desc';
}

export class BatchRepository {
  async create(data: {
    batchNumber: string;
    productName: string;
    origin: string;
    quantity: number;
    unit: string;
    currentStatus?: BatchStatus;
    createdBy: string;
  }): Promise<IBatch> {
    return Batch.create(data);
  }

  async findById(id: string): Promise<IBatch | null> {
    return Batch.findById(id);
  }

  async findByBatchNumber(batchNumber: string): Promise<IBatch | null> {
    return Batch.findOne({ batchNumber });
  }

  async findMany(
    filter: BatchListFilter,
    page: number,
    limit: number
  ): Promise<{ batches: IBatch[]; total: number }> {
    const query: any = {};
    if (filter.search) {
      query.$or = [
        { batchNumber: { $regex: filter.search, $options: 'i' } },
        { productName: { $regex: filter.search, $options: 'i' } },
      ];
    }
    if (filter.status) {
      query.currentStatus = filter.status;
    }

    const total = await Batch.countDocuments(query);
    const batches = await Batch.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return { batches, total };
  }

  async findRecent(limit: number, sort: string, order: 'asc' | 'desc'): Promise<IBatch[]> {
    const sortOptions: any = { [sort]: order === 'desc' ? -1 : 1 };
    return Batch.find().sort(sortOptions).limit(limit);
  }

  async updateStatus(id: string, status: BatchStatus): Promise<IBatch | null> {
    return Batch.findByIdAndUpdate(id, { currentStatus: status }, { new: true });
  }

  async countByStatus(status: BatchStatus): Promise<number> {
    return Batch.countDocuments({ currentStatus: status });
  }

  async countAll(): Promise<number> {
    return Batch.countDocuments();
  }
}

export const batchRepository = new BatchRepository();
