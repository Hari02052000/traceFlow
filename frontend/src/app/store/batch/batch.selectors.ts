import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BatchState } from './batch.reducer';

const selectBatchState = createFeatureSelector<BatchState>('batch');

// List
const selectBatchList = createSelector(selectBatchState, (state) => state.list);
export const selectBatches = createSelector(selectBatchList, (list) => list.batches);
export const selectBatchListLoading = createSelector(selectBatchList, (list) => list.loading);
export const selectBatchListError = createSelector(selectBatchList, (list) => list.error);
export const selectBatchListPage = createSelector(selectBatchList, (list) => list.page);
export const selectBatchListTotal = createSelector(selectBatchList, (list) => list.total);
export const selectBatchListTotalPages = createSelector(selectBatchList, (list) => list.totalPages);

// Detail
const selectBatchDetail = createSelector(selectBatchState, (state) => state.detail);
export const selectCurrentBatch = createSelector(selectBatchDetail, (detail) => detail.batch);
export const selectTraceEvents = createSelector(selectBatchDetail, (detail) => detail.traceEvents);
export const selectBatchDetailLoading = createSelector(selectBatchDetail, (detail) => detail.loading);
export const selectBatchDetailError = createSelector(selectBatchDetail, (detail) => detail.error);
export const selectBatchDetailUpdateError = createSelector(selectBatchDetail, (detail) => detail.updateError);
export const selectBatchDetailUpdateLoading = createSelector(selectBatchDetail, (detail) => detail.updateLoading);
export const selectBatchDetailArchiveError = createSelector(selectBatchDetail, (detail) => detail.archiveError);

// Create
const selectBatchCreate = createSelector(selectBatchState, (state) => state.create);
export const selectBatchCreateLoading = createSelector(selectBatchCreate, (create) => create.loading);
export const selectBatchCreateError = createSelector(selectBatchCreate, (create) => create.error);

// Dashboard
const selectDashboard = createSelector(selectBatchState, (state) => state.dashboard);
export const selectDashboardStats = createSelector(selectDashboard, (dashboard) => dashboard.stats);
export const selectRecentBatches = createSelector(selectDashboard, (dashboard) => dashboard.recentBatches);
export const selectDashboardStatsLoading = createSelector(selectDashboard, (dashboard) => dashboard.statsLoading);
export const selectRecentBatchesLoading = createSelector(selectDashboard, (dashboard) => dashboard.recentLoading);
export const selectDashboardStatsError = createSelector(selectDashboard, (dashboard) => dashboard.statsError);
export const selectRecentBatchesError = createSelector(selectDashboard, (dashboard) => dashboard.recentBatchesError);
