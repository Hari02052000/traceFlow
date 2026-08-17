import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastComponent } from '../../ui/toast/toast.component';
import { ToastService } from '../../ui/toast/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [ToastComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed right-tf-4 bottom-tf-4 z-50 grid gap-tf-2" style="max-width: 360px">
      @for (toast of toasts(); track toast.id) {
        <app-toast [message]="toast.message" [type]="toast.type" (dismiss)="dismiss(toast.id)" />
      }
    </div>
  `,
})
export class ToastContainerComponent {
  private readonly toastService = inject(ToastService);
  protected readonly toasts = this.toastService.toastsSignal;

  protected dismiss(id: number): void {
    this.toastService.dismiss(id);
  }
}
