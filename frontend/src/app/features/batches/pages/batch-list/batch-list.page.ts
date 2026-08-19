import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { EmptyStateComponent } from '../../../../shared/ui/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../../shared/ui/error-state/error-state.component';
import { LoadingSpinnerComponent } from '../../../../shared/ui/loading-spinner/loading-spinner.component';
import { PageHeaderComponent } from '../../../../shared/layout/page-header/page-header.component';
import { SearchInputComponent } from '../../../../shared/ui/search-input/search-input.component';
import { SelectComponent, SelectOption } from '../../../../shared/ui/select/select.component';
import { StatusBadgeComponent } from '../../../../shared/ui/status-badge/status-badge.component';
import { BATCH_STATUS_LABELS, BATCH_STATUSES, BatchStatus } from '../../../../core/models/batch.models';
import { loadBatches, archiveBatch, unarchiveBatch } from '../../../../store/batch/batch.actions';
import { selectBatchListError, selectBatchListLoading, selectBatchListPage, selectBatchListTotalPages, selectBatches } from '../../../../store/batch/batch.selectors';
import { selectUserRole } from '../../../../store/auth/auth.selectors';

@Component({
  selector: 'app-batch-list-page',
  standalone: true,
  imports: [ButtonComponent, CardComponent, DatePipe, EmptyStateComponent, ErrorStateComponent, FormsModule, LoadingSpinnerComponent, PageHeaderComponent, RouterLink, SearchInputComponent, SelectComponent, StatusBadgeComponent],
  templateUrl: './batch-list.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BatchListPage implements OnInit {
  private readonly store = inject(Store);

  protected readonly batches = this.store.selectSignal(selectBatches);
  protected readonly loading = this.store.selectSignal(selectBatchListLoading);
  protected readonly listError = this.store.selectSignal(selectBatchListError);
  protected readonly currentPage = this.store.selectSignal(selectBatchListPage);
  protected readonly totalPages = this.store.selectSignal(selectBatchListTotalPages);
  protected readonly isAdmin = this.store.selectSignal(selectUserRole);

  protected readonly search = signal('');
  protected selectedStatus = '';
  protected readonly page = signal(1);

  protected readonly statusOptions: SelectOption[] = [
    { value: '', label: 'All statuses' },
    ...BATCH_STATUSES.map((s) => ({ value: s, label: BATCH_STATUS_LABELS[s] })),
  ];

  ngOnInit(): void {
    this.loadBatches();
  }

  protected onSearchChange(query: string): void {
    this.search.set(query);
    this.page.set(1);
    this.loadBatches();
  }

  protected onStatusChange(status: string): void {
    this.selectedStatus = status;
    this.page.set(1);
    this.loadBatches();
  }

  protected goToPage(page: number): void {
    this.page.set(page);
    this.loadBatches();
  }

  protected retry(): void {
    this.loadBatches();
  }

  protected archive(event: MouseEvent, id: string): void {
    event.stopPropagation();
    event.preventDefault();
    this.store.dispatch(archiveBatch({ id }));
  }

  protected unarchive(event: MouseEvent, id: string): void {
    event.stopPropagation();
    event.preventDefault();
    this.store.dispatch(unarchiveBatch({ id }));
  }

  private loadBatches(): void {
    this.store.dispatch(loadBatches({
      params: {
        page: this.page(),
        limit: 10,
        search: this.search() || undefined,
        status: (this.selectedStatus as BatchStatus) || undefined,
      },
    }));
  }
}
