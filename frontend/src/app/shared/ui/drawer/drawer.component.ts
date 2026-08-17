import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-drawer',
  standalone: true,
  templateUrl: './drawer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent {
  @Input() open = false;
  @Input() title = '';
  @Input() position: 'left' | 'right' = 'right';
  @Input() closeOnBackdrop = true;
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.open) this.closed.emit();
  }

  protected closeFromBackdrop(): void {
    if (this.closeOnBackdrop) this.closed.emit();
  }
}
