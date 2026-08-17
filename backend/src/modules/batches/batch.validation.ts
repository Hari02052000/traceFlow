import { z } from 'zod';

const batchStatusEnum = z.enum(['HARVESTED', 'PROCESSING', 'QUALITY_CHECK', 'IN_TRANSIT', 'DELIVERED', 'ARCHIVED']);

export const createBatchSchema = z.object({
  batchNumber: z.string().min(1, 'Batch number is required'),
  productName: z.string().min(1, 'Product name is required'),
  origin: z.string().min(1, 'Origin is required'),
  quantity: z.number().positive('Quantity must be positive'),
  unit: z.string().min(1, 'Unit is required'),
});

export const updateStatusSchema = z.object({
  status: batchStatusEnum,
  location: z.string().min(1, 'Location is required'),
  notes: z.string().optional().default(''),
});

export const batchListQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  search: z.string().optional(),
  status: batchStatusEnum.optional(),
  sort: z.enum(['createdAt', 'updatedAt', 'batchNumber', 'productName']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
});
