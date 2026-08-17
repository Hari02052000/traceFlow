import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { EmptyStateComponent } from '../../../../shared/ui/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../../shared/ui/error-state/error-state.component';
import { LoadingSpinnerComponent } from '../../../../shared/ui/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../../../shared/ui/status-badge/status-badge.component';
import { selectDashboardStats, selectDashboardStatsError, selectDashboardStatsLoading, selectRecentBatches, selectRecentBatchesError, selectRecentBatchesLoading } from '../../../../store/batch/batch.selectors';
import { loadDashboardStats, loadRecentBatches } from '../../../../store/batch/batch.actions';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CardComponent, EmptyStateComponent, ErrorStateComponent, LoadingSpinnerComponent, RouterLink, StatusBadgeComponent],
  templateUrl: './dashboard.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
  private readonly store = inject(Store);

  protected readonly stats = this.store.selectSignal(selectDashboardStats);
  protected readonly statsLoading = this.store.selectSignal(selectDashboardStatsLoading);
  protected readonly statsError = this.store.selectSignal(selectDashboardStatsError);
  protected readonly recentBatches = this.store.selectSignal(selectRecentBatches);
  protected readonly recentLoading = this.store.selectSignal(selectRecentBatchesLoading);
  protected readonly recentError = this.store.selectSignal(selectRecentBatchesError);

  ngOnInit(): void {
    this.store.dispatch(loadDashboardStats());
    this.store.dispatch(loadRecentBatches({ limit: 5 }));
  }

  protected retryStats(): void {
    this.store.dispatch(loadDashboardStats());
  }

  protected retryRecent(): void {
    this.store.dispatch(loadRecentBatches({ limit: 5 }));
  }
}
