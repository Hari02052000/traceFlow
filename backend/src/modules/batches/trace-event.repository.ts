import { TraceEvent, ITraceEvent } from './trace-event.model';

export class TraceEventRepository {
  async create(data: {
    batchId: string;
    status: string;
    location: string;
    notes?: string;
    updatedBy: string;
  }): Promise<ITraceEvent> {
    return TraceEvent.create(data);
  }

  async findByBatchId(batchId: string): Promise<ITraceEvent[]> {
    return TraceEvent.find({ batchId })
      .populate('updatedBy', 'name role')
      .sort({ createdAt: 1 });
  }
}

export const traceEventRepository = new TraceEventRepository();
