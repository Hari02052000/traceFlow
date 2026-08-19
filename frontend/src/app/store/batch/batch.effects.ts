import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { BatchService } from '../../core/services/batch.service';
import { ToastService } from '../../shared/ui/toast/toast.service';
import * as BatchActions from './batch.actions';

@Injectable()
export class BatchEffects {
  private readonly actions$ = inject(Actions);
  private readonly batchService = inject(BatchService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  readonly loadBatches$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BatchActions.loadBatches),
      switchMap(({ params }) =>
        this.batchService.getBatches(params).pipe(
          map((response) => BatchActions.loadBatchesSuccess({ response })),
          catchError((err) => of(BatchActions.loadBatchesFailure({ error: err.error?.error?.message ?? 'Failed to load batches.' }))),
        ),
      ),
    ),
  );

  readonly loadBatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BatchActions.loadBatch),
      switchMap(({ id }) =>
        this.batchService.getBatch(id).pipe(
          map((batch) => BatchActions.loadBatchSuccess({ batch })),
          catchError((err) => of(BatchActions.loadBatchFailure({ error: err.error?.error?.message ?? 'Failed to load batch.' }))),
        ),
      ),
    ),
  );

  readonly loadBatchWithTraces$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BatchActions.loadBatchSuccess),
      switchMap(({ batch }) =>
        this.batchService.getTraceEvents(batch.id).pipe(
          map((events) => BatchActions.loadTraceEventsSuccess({ batchId: batch.id, events })),
          catchError(() => of(BatchActions.loadTraceEventsFailure({ error: 'Failed to load trace events.' }))),
        ),
      ),
    ),
  );

  readonly createBatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BatchActions.createBatch),
      exhaustMap(({ data }) =>
        this.batchService.createBatch(data).pipe(
          map((batch) => BatchActions.createBatchSuccess({ batch })),
          catchError((err) => of(BatchActions.createBatchFailure({ error: err.error?.error?.message ?? 'Failed to create batch.' }))),
        ),
      ),
    ),
  );

  readonly createBatchSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BatchActions.createBatchSuccess),
        tap(({ batch }) => {
          this.toast.show(`Batch ${batch.batchNumber} created.`, 'success');
          this.router.navigate(['/batches', batch.id]);
        }),
      ),
    { dispatch: false },
  );

  readonly updateStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BatchActions.updateBatchStatus),
      exhaustMap(({ id, data }) =>
        this.batchService.updateBatchStatus(id, data).pipe(
          map((batch) => BatchActions.updateBatchStatusSuccess({ batch })),
          catchError((err) => of(BatchActions.updateBatchStatusFailure({ error: err.error?.error?.message ?? 'Failed to update status.' }))),
        ),
      ),
    ),
  );

  readonly updateStatusSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BatchActions.updateBatchStatusSuccess),
        tap(() => this.toast.show('Status updated successfully.', 'success')),
      ),
    { dispatch: false },
  );

  readonly archiveBatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BatchActions.archiveBatch),
      exhaustMap(({ id }) =>
        this.batchService.archiveBatch(id).pipe(
          map((batch) => BatchActions.archiveBatchSuccess({ batch })),
          catchError((err) => of(BatchActions.archiveBatchFailure({ error: err.error?.error?.message ?? 'Failed to archive batch.' }))),
        ),
      ),
    ),
  );

  readonly archiveBatchSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BatchActions.archiveBatchSuccess),
        tap(() => this.toast.show('Batch archived successfully.', 'success')),
      ),
    { dispatch: false },
  );

  readonly archiveBatchFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BatchActions.archiveBatchFailure),
        tap(({ error }) => this.toast.show(error, 'error')),
      ),
    { dispatch: false },
  );

  readonly unarchiveBatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BatchActions.unarchiveBatch),
      exhaustMap(({ id }) =>
        this.batchService.unarchiveBatch(id).pipe(
          map((batch) => BatchActions.unarchiveBatchSuccess({ batch })),
          catchError((err) => of(BatchActions.unarchiveBatchFailure({ error: err.error?.error?.message ?? 'Failed to unarchive batch.' }))),
        ),
      ),
    ),
  );

  readonly unarchiveBatchSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BatchActions.unarchiveBatchSuccess),
        tap(() => this.toast.show('Batch unarchived successfully.', 'success')),
      ),
    { dispatch: false },
  );

  readonly unarchiveBatchFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BatchActions.unarchiveBatchFailure),
        tap(({ error }) => this.toast.show(error, 'error')),
      ),
    { dispatch: false },
  );

  readonly reloadTracesAfterStatusChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        BatchActions.updateBatchStatusSuccess,
        BatchActions.archiveBatchSuccess,
        BatchActions.unarchiveBatchSuccess,
      ),
      switchMap(({ batch }) =>
        this.batchService.getTraceEvents(batch.id).pipe(
          map((events) => BatchActions.loadTraceEventsSuccess({ batchId: batch.id, events })),
          catchError(() => of(BatchActions.loadTraceEventsFailure({ error: 'Failed to reload trace events.' }))),
        ),
      ),
    ),
  );

  readonly loadDashboardStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BatchActions.loadDashboardStats),
      switchMap(() =>
        this.batchService.getDashboardStats().pipe(
          map((stats) => BatchActions.loadDashboardStatsSuccess({ stats })),
          catchError(() => of(BatchActions.loadDashboardStatsFailure({ error: 'Failed to load stats.' }))),
        ),
      ),
    ),
  );

  readonly loadRecentBatches$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BatchActions.loadRecentBatches),
      switchMap(({ limit }) =>
        this.batchService.getRecentBatches(limit).pipe(
          map((batches) => BatchActions.loadRecentBatchesSuccess({ batches })),
          catchError(() => of(BatchActions.loadRecentBatchesFailure({ error: 'Failed to load recent batches.' }))),
        ),
      ),
    ),
  );
}
