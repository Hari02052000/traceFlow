import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, effect, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { DrawerComponent } from '../../../../shared/ui/drawer/drawer.component';
import { EmptyStateComponent } from '../../../../shared/ui/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../../shared/ui/error-state/error-state.component';
import { FormFieldComponent } from '../../../../shared/ui/form-field/form-field.component';
import { InputComponent } from '../../../../shared/ui/input/input.component';
import { LoadingSpinnerComponent } from '../../../../shared/ui/loading-spinner/loading-spinner.component';
import { SelectComponent, SelectOption } from '../../../../shared/ui/select/select.component';
import { StatusBadgeComponent } from '../../../../shared/ui/status-badge/status-badge.component';
import { TextareaComponent } from '../../../../shared/ui/textarea/textarea.component';
import { BATCH_STATUS_LABELS, BATCH_STATUSES, BatchStatus } from '../../../../core/models/batch.models';
import { archiveBatch, loadBatch, updateBatchStatus } from '../../../../store/batch/batch.actions';
import { selectBatchDetailError, selectBatchDetailLoading, selectBatchDetailUpdateError, selectCurrentBatch, selectTraceEvents } from '../../../../store/batch/batch.selectors';
import { selectUserRole } from '../../../../store/auth/auth.selectors';

@Component({
  selector: 'app-batch-details-page',
  standalone: true,
  imports: [ButtonComponent, CardComponent, DatePipe, DrawerComponent, EmptyStateComponent, ErrorStateComponent, FormFieldComponent, InputComponent, LoadingSpinnerComponent, ReactiveFormsModule, RouterLink, SelectComponent, StatusBadgeComponent, TextareaComponent],
  templateUrl: './batch-details.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BatchDetailsPage implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);
  private readonly formBuilder = inject(FormBuilder);
  private readonly routeSub?: Subscription;

  protected readonly batch = this.store.selectSignal(selectCurrentBatch);
  protected readonly traceEvents = this.store.selectSignal(selectTraceEvents);
  protected readonly loading = this.store.selectSignal(selectBatchDetailLoading);
  protected readonly batchError = this.store.selectSignal(selectBatchDetailError);
  protected readonly updateError = this.store.selectSignal(selectBatchDetailUpdateError);
  protected readonly role = this.store.selectSignal(selectUserRole);
  protected readonly drawerOpen = signal(false);
  protected readonly submitted = signal(false);
  protected readonly updateSuccess = signal(false);

  private readonly closeDrawerOnSuccess = effect(() => {
    const error = this.updateError();
    const loading = this.loading();
    if (!loading && !error && this.updateSuccess()) {
      this.updateSuccess.set(false);
      this.drawerOpen.set(false);
      this.form.reset({ status: '', location: '', notes: '' });
    }
  });

  protected readonly form = this.formBuilder.nonNullable.group({
    status: ['', Validators.required],
    location: ['', Validators.required],
    notes: [''],
  });

  protected readonly statusOptions: SelectOption[] = BATCH_STATUSES.map((s) => ({
    value: s,
    label: BATCH_STATUS_LABELS[s],
  }));

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(loadBatch({ id }));
    }
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  protected openDrawer(): void {
    const currentStatus = this.batch()?.currentStatus;
    if (currentStatus) {
      const currentIndex = BATCH_STATUSES.indexOf(currentStatus);
      const nextStatuses = BATCH_STATUSES.slice(currentIndex + 1);
      this.form.controls.status.setValue(nextStatuses[0] ?? '');
    }
    this.form.controls.location.setValue('');
    this.form.controls.notes.setValue('');
    this.submitted.set(false);
    this.updateSuccess.set(false);
    this.drawerOpen.set(true);
  }

  protected closeDrawer(): void {
    this.drawerOpen.set(false);
    this.updateSuccess.set(false);
    this.form.reset({ status: '', location: '', notes: '' });
  }

  protected onSubmit(): void {
    this.submitted.set(true);
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const batchId = this.batch()?.id;
      if (batchId) {
        const { status, location, notes } = this.form.getRawValue();
        this.updateSuccess.set(true);
        this.store.dispatch(updateBatchStatus({
          id: batchId,
          data: { status: status as BatchStatus, location, notes },
        }));
      }
    }
  }

  protected nextStatuses(): SelectOption[] {
    const currentStatus = this.batch()?.currentStatus;
    if (!currentStatus) return [];
    const currentIndex = BATCH_STATUSES.indexOf(currentStatus);
    return BATCH_STATUSES.slice(currentIndex + 1).map((s) => ({
      value: s,
      label: BATCH_STATUS_LABELS[s],
    }));
  }

  protected archiveBatch(): void {
    const batchId = this.batch()?.id;
    if (batchId) {
      this.store.dispatch(archiveBatch({ id: batchId }));
    }
  }

  protected retry(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(loadBatch({ id }));
    }
  }
}
