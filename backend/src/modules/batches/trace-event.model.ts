import mongoose, { Schema, Document } from 'mongoose';
import { BatchStatus } from './batch.model';

export interface ITraceEvent extends Document {
  batchId: mongoose.Types.ObjectId;
  status: BatchStatus;
  location: string;
  notes: string;
  updatedBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const traceEventSchema = new Schema<ITraceEvent>(
  {
    batchId: { type: Schema.Types.ObjectId, ref: 'Batch', required: true },
    status: {
      type: String,
      enum: ['HARVESTED', 'PROCESSING', 'QUALITY_CHECK', 'IN_TRANSIT', 'DELIVERED', 'ARCHIVED'],
      required: true,
    },
    location: { type: String, required: true, trim: true },
    notes: { type: String, default: '' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const TraceEvent = mongoose.model<ITraceEvent>('TraceEvent', traceEventSchema);
