import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex items-center gap-tf-3 rounded-tf-md border px-tf-4 py-tf-3 text-sm font-medium shadow-tf-md transition-all"
      [class]="classes"
      role="alert"
    >
      <span class="flex-1">{{ message }}</span>
      <button
        type="button"
        class="ml-tf-2 cursor-pointer border-0 bg-transparent p-0 text-current opacity-60 hover:opacity-100"
        (click)="dismiss.emit()"
        aria-label="Dismiss"
      >
        &times;
      </button>
    </div>
  `,
})
export class ToastComponent {
  @Input() message = '';
  @Input() type: 'success' | 'error' | 'info' = 'info';
  @Output() dismiss = new EventEmitter<void>();

  get classes(): string {
    const base = 'border-tf-border bg-tf-surface text-tf-primary';
    switch (this.type) {
      case 'success':
        return `${base} border-l-4 border-l-tf-success`;
      case 'error':
        return `${base} border-l-4 border-l-tf-danger`;
      case 'info':
        return `${base} border-l-4 border-l-tf-info`;
    }
  }
}
