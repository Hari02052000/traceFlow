import { UserRole } from './auth.models';

export type BatchStatus = 'HARVESTED' | 'PROCESSING' | 'QUALITY_CHECK' | 'IN_TRANSIT' | 'DELIVERED' | 'ARCHIVED';

export const BATCH_STATUS_LABELS: Record<BatchStatus, string> = {
  HARVESTED: 'Harvested',
  PROCESSING: 'Processing',
  QUALITY_CHECK: 'Quality Check',
  IN_TRANSIT: 'In Transit',
  DELIVERED: 'Delivered',
  ARCHIVED: 'Archived',
};

export const BATCH_STATUSES: readonly BatchStatus[] = ['HARVESTED', 'PROCESSING', 'QUALITY_CHECK', 'IN_TRANSIT', 'DELIVERED', 'ARCHIVED'];

export interface Batch {
  id: string;
  batchNumber: string;
  productName: string;
  origin: string;
  quantity: number;
  unit: string;
  currentStatus: BatchStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TraceEvent {
  id: string;
  batchId: string;
  status: BatchStatus;
  location: string;
  notes: string;
  timestamp: string;
  recordedBy?: {
    id: string;
    name: string;
    role: UserRole;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BatchListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: BatchStatus;
}

export interface CreateBatchRequest {
  batchNumber: string;
  productName: string;
  origin: string;
  quantity: number;
  unit: string;
}

export interface UpdateStatusRequest {
  status: BatchStatus;
  location: string;
  notes: string;
}

export interface DashboardStats {
  totalBatches: number;
  inTransit: number;
  delivered: number;
}
