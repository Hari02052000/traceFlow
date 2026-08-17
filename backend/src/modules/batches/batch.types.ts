import { BatchStatus } from './batch.model';

export const STATUS_TRANSITIONS: Record<BatchStatus, BatchStatus | null> = {
  HARVESTED: 'PROCESSING',
  PROCESSING: 'QUALITY_CHECK',
  QUALITY_CHECK: 'IN_TRANSIT',
  IN_TRANSIT: 'DELIVERED',
  DELIVERED: null,
  ARCHIVED: null,
};

export interface BatchListQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: BatchStatus;
  sort?: string;
  order?: 'asc' | 'desc';
}
