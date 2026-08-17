import { createAction, props } from '@ngrx/store';
import { Batch, BatchListParams, BatchStatus, CreateBatchRequest, DashboardStats, PaginatedResponse, TraceEvent, UpdateStatusRequest } from '../../core/models/batch.models';

// List
export const loadBatches = createAction('[Batch] Load Batches', props<{ params: BatchListParams }>());
export const loadBatchesSuccess = createAction('[Batch] Load Batches Success', props<{ response: PaginatedResponse<Batch> }>());
export const loadBatchesFailure = createAction('[Batch] Load Batches Failure', props<{ error: string }>());

// Detail
export const loadBatch = createAction('[Batch] Load Batch', props<{ id: string }>());
export const loadBatchSuccess = createAction('[Batch] Load Batch Success', props<{ batch: Batch }>());
export const loadBatchFailure = createAction('[Batch] Load Batch Failure', props<{ error: string }>());

// Trace events
export const loadTraceEvents = createAction('[Batch] Load Trace Events', props<{ batchId: string }>());
export const loadTraceEventsSuccess = createAction('[Batch] Load Trace Events Success', props<{ batchId: string; events: TraceEvent[] }>());
export const loadTraceEventsFailure = createAction('[Batch] Load Trace Events Failure', props<{ error: string }>());

// Create
export const createBatch = createAction('[Batch] Create Batch', props<{ data: CreateBatchRequest }>());
export const createBatchSuccess = createAction('[Batch] Create Batch Success', props<{ batch: Batch }>());
export const createBatchFailure = createAction('[Batch] Create Batch Failure', props<{ error: string }>());

// Update status
export const updateBatchStatus = createAction('[Batch] Update Status', props<{ id: string; data: UpdateStatusRequest }>());
export const updateBatchStatusSuccess = createAction('[Batch] Update Status Success', props<{ batch: Batch }>());
export const updateBatchStatusFailure = createAction('[Batch] Update Status Failure', props<{ error: string }>());

// Archive
export const archiveBatch = createAction('[Batch] Archive Batch', props<{ id: string }>());
export const archiveBatchSuccess = createAction('[Batch] Archive Batch Success', props<{ batch: Batch }>());
export const archiveBatchFailure = createAction('[Batch] Archive Batch Failure', props<{ error: string }>());

// Dashboard
export const loadDashboardStats = createAction('[Batch] Load Dashboard Stats');
export const loadDashboardStatsSuccess = createAction('[Batch] Load Dashboard Stats Success', props<{ stats: DashboardStats }>());
export const loadDashboardStatsFailure = createAction('[Batch] Load Dashboard Stats Failure', props<{ error: string }>());

export const loadRecentBatches = createAction('[Batch] Load Recent Batches', props<{ limit?: number }>());
export const loadRecentBatchesSuccess = createAction('[Batch] Load Recent Batches Success', props<{ batches: Batch[] }>());
export const loadRecentBatchesFailure = createAction('[Batch] Load Recent Batches Failure', props<{ error: string }>());
