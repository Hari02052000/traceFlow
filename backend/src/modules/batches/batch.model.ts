import mongoose, { Schema, Document } from 'mongoose';

export type BatchStatus = 'HARVESTED' | 'PROCESSING' | 'QUALITY_CHECK' | 'IN_TRANSIT' | 'DELIVERED' | 'ARCHIVED';

export interface IBatch extends Document {
  batchNumber: string;
  productName: string;
  origin: string;
  quantity: number;
  unit: string;
  currentStatus: BatchStatus;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const batchSchema = new Schema<IBatch>(
  {
    batchNumber: { type: String, required: true, unique: true, trim: true },
    productName: { type: String, required: true, trim: true },
    origin: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true, trim: true },
    currentStatus: {
      type: String,
      enum: ['HARVESTED', 'PROCESSING', 'QUALITY_CHECK', 'IN_TRANSIT', 'DELIVERED', 'ARCHIVED'],
      default: 'HARVESTED',
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Batch = mongoose.model<IBatch>('Batch', batchSchema);
