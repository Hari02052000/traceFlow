import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  protected readonly toasts = signal<Toast[]>([]);
  private nextId = 0;

  get toastsSignal() {
    return this.toasts;
  }

  show(message: string, type: Toast['type'] = 'info'): void {
    const toast: Toast = { id: this.nextId++, message, type };
    this.toasts.update((t) => [...t, toast]);

    setTimeout(() => this.dismiss(toast.id), 4000);
  }

  dismiss(id: number): void {
    this.toasts.update((t) => t.filter((item) => item.id !== id));
  }
}
