import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type BatchStatus = 'HARVESTED' | 'PROCESSING' | 'QUALITY_CHECK' | 'IN_TRANSIT' | 'DELIVERED';
export type StatusBadgeStatus = BatchStatus | 'NEUTRAL' | 'SUCCESS' | 'INFO' | 'WARNING' | 'DANGER';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadgeComponent {
  @Input({ required: true }) status: StatusBadgeStatus = 'NEUTRAL';
  @Input() label?: string;

  protected get displayLabel(): string {
    return this.label ?? this.status.replaceAll('_', ' ');
  }
}
