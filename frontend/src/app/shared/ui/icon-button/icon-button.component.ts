import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export type IconButtonVariant = 'secondary' | 'ghost' | 'danger';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  templateUrl: './icon-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent {
  @Input({ required: true }) ariaLabel = '';
  @Input() variant: IconButtonVariant = 'ghost';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Output() pressed = new EventEmitter<MouseEvent>();
  protected readonly variantClasses: Record<IconButtonVariant, string> = {
    secondary: 'border-tf-border bg-tf-surface text-tf-primary', ghost: 'border-transparent bg-transparent text-tf-secondary', danger: 'border-transparent bg-transparent text-tf-danger',
  };

  protected onClick(event: MouseEvent): void {
    this.pressed.emit(event);
  }
}
