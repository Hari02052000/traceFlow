import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type BatchStatus = 'HARVESTED' | 'PROCESSING' | 'QUALITY_CHECK' | 'IN_TRANSIT' | 'DELIVERED';
export type StatusBadgeStatus = BatchStatus | 'NEUTRAL' | 'SUCCESS' | 'INFO' | 'WARNING' | 'DANGER';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  templateUrl: './status-badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadgeComponent {
  @Input({ required: true }) status: StatusBadgeStatus = 'NEUTRAL';
  @Input() label?: string;
  protected readonly statusClasses: Record<StatusBadgeStatus, string> = {
    HARVESTED: 'bg-tf-success-subtle text-tf-success', PROCESSING: 'bg-tf-info-subtle text-tf-info', QUALITY_CHECK: 'bg-tf-warning-subtle text-tf-warning', IN_TRANSIT: 'bg-tf-info-subtle text-tf-info', DELIVERED: 'bg-tf-success-subtle text-tf-success', NEUTRAL: 'bg-tf-surface-subtle text-tf-secondary', SUCCESS: 'bg-tf-success-subtle text-tf-success', INFO: 'bg-tf-info-subtle text-tf-info', WARNING: 'bg-tf-warning-subtle text-tf-warning', DANGER: 'bg-tf-danger-subtle text-tf-danger',
  };

  protected get displayLabel(): string {
    return this.label ?? this.status.replaceAll('_', ' ');
  }
}
