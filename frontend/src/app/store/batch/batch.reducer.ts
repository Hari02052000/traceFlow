import { createReducer, on } from '@ngrx/store';
import { Batch, DashboardStats, PaginatedResponse, TraceEvent } from '../../core/models/batch.models';
import * as BatchActions from './batch.actions';

export interface BatchListState {
  batches: Batch[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

export interface BatchDetailState {
  batch: Batch | null;
  traceEvents: TraceEvent[];
  loading: boolean;
  error: string | null;
  updateLoading: boolean;
  updateError: string | null;
  archiveError: string | null;
}

export interface BatchCreateState {
  loading: boolean;
  error: string | null;
}

export interface DashboardState {
  stats: DashboardStats | null;
  recentBatches: Batch[];
  statsLoading: boolean;
  recentLoading: boolean;
  statsError: string | null;
  recentBatchesError: string | null;
}

export interface BatchState {
  list: BatchListState;
  detail: BatchDetailState;
  create: BatchCreateState;
  dashboard: DashboardState;
}

const initialListState: BatchListState = {
  batches: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  loading: false,
  error: null,
};

const initialDetailState: BatchDetailState = {
  batch: null,
  traceEvents: [],
  loading: false,
  error: null,
  updateLoading: false,
  updateError: null,
  archiveError: null,
};

const initialCreateState: BatchCreateState = {
  loading: false,
  error: null,
};

const initialDashboardState: DashboardState = {
  stats: null,
  recentBatches: [],
  statsLoading: false,
  recentLoading: false,
  statsError: null,
  recentBatchesError: null,
};

const initialState: BatchState = {
  list: initialListState,
  detail: initialDetailState,
  create: initialCreateState,
  dashboard: initialDashboardState,
};

export const batchReducer = createReducer(
  initialState,

  // List
  on(BatchActions.loadBatches, (state, { params }) => ({
    ...state,
    list: { ...state.list, loading: true, error: null, page: params.page ?? state.list.page },
  })),
  on(BatchActions.loadBatchesSuccess, (state, { response }) => ({
    ...state,
    list: {
      ...state.list,
      batches: response.data,
      total: response.total,
      page: response.page,
      limit: response.limit,
      totalPages: response.totalPages,
      loading: false,
    },
  })),
  on(BatchActions.loadBatchesFailure, (state, { error }) => ({
    ...state,
    list: { ...state.list, loading: false, error },
  })),

  // Detail
  on(BatchActions.loadBatch, (state) => ({
    ...state,
    detail: { ...initialDetailState, loading: true },
  })),
  on(BatchActions.loadBatchSuccess, (state, { batch }) => ({
    ...state,
    detail: { ...state.detail, batch, loading: false },
  })),
  on(BatchActions.loadBatchFailure, (state, { error }) => ({
    ...state,
    detail: { ...state.detail, loading: false, error },
  })),

  // Trace events
  on(BatchActions.loadTraceEvents, (state) => ({
    ...state,
    detail: { ...state.detail, traceEvents: [] },
  })),
  on(BatchActions.loadTraceEventsSuccess, (state, { events }) => ({
    ...state,
    detail: { ...state.detail, traceEvents: events },
  })),
  on(BatchActions.loadTraceEventsFailure, (state, { error }) => ({
    ...state,
    detail: { ...state.detail, error },
  })),

  // Create
  on(BatchActions.createBatch, (state) => ({
    ...state,
    create: { loading: true, error: null },
  })),
  on(BatchActions.createBatchSuccess, (state) => ({
    ...state,
    create: { ...state.create, loading: false },
  })),
  on(BatchActions.createBatchFailure, (state, { error }) => ({
    ...state,
    create: { ...state.create, loading: false, error },
  })),

  // Update status
  on(BatchActions.updateBatchStatus, (state) => ({
    ...state,
    detail: { ...state.detail, updateLoading: true, updateError: null },
  })),
  on(BatchActions.updateBatchStatusSuccess, (state, { batch }) => ({
    ...state,
    detail: { ...state.detail, batch, updateLoading: false, updateError: null },
  })),
  on(BatchActions.updateBatchStatusFailure, (state, { error }) => ({
    ...state,
    detail: { ...state.detail, updateLoading: false, updateError: error },
  })),

  // Archive
  on(BatchActions.archiveBatch, (state) => ({
    ...state,
    detail: { ...state.detail, archiveError: null },
  })),
  on(BatchActions.archiveBatchSuccess, (state, { batch }) => ({
    ...state,
    list: {
      ...state.list,
      batches: state.list.batches.map((b) => (b.id === batch.id ? batch : b)),
    },
    detail: { ...state.detail, batch, archiveError: null },
  })),
  on(BatchActions.archiveBatchFailure, (state, { error }) => ({
    ...state,
    detail: { ...state.detail, archiveError: error },
  })),

  // Dashboard
  on(BatchActions.loadDashboardStats, (state) => ({
    ...state,
    dashboard: { ...state.dashboard, statsLoading: true },
  })),
  on(BatchActions.loadDashboardStatsSuccess, (state, { stats }) => ({
    ...state,
    dashboard: { ...state.dashboard, stats, statsLoading: false },
  })),
  on(BatchActions.loadDashboardStatsFailure, (state) => ({
    ...state,
    dashboard: { ...state.dashboard, statsLoading: false, statsError: 'Failed to load dashboard stats.' },
  })),

  on(BatchActions.loadRecentBatches, (state) => ({
    ...state,
    dashboard: { ...state.dashboard, recentLoading: true },
  })),
  on(BatchActions.loadRecentBatchesSuccess, (state, { batches }) => ({
    ...state,
    dashboard: { ...state.dashboard, recentBatches: batches, recentLoading: false },
  })),
  on(BatchActions.loadRecentBatchesFailure, (state) => ({
    ...state,
    dashboard: { ...state.dashboard, recentLoading: false, recentBatchesError: 'Failed to load recent batches.' },
  })),
);
