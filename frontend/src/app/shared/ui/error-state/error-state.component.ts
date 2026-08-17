import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-state',
  standalone: true,
  templateUrl: './error-state.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorStateComponent {
  @Input() title = 'Something went wrong';
  @Input() description = 'Please try again.';
  @Input() retryLabel = 'Try again';
  @Input() showRetry = true;
  @Output() retry = new EventEmitter<void>();
}
