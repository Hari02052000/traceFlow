import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export type AlertVariant = 'success' | 'info' | 'warning' | 'danger';

@Component({
  selector: 'app-alert',
  standalone: true,
  templateUrl: './alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  @Input() variant: AlertVariant = 'info';
  @Input() title = '';
  @Input() dismissible = false;
  @Output() dismissed = new EventEmitter<void>();
  protected readonly variantClasses: Record<AlertVariant, string> = { success: 'border-tf-success bg-tf-success-subtle text-tf-success', info: 'border-tf-info bg-tf-info-subtle text-tf-info', warning: 'border-tf-warning bg-tf-warning-subtle text-tf-warning', danger: 'border-tf-danger bg-tf-danger-subtle text-tf-danger' };
}
