import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

 type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
 type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Output() pressed = new EventEmitter<MouseEvent>();
  protected readonly variantClasses: Record<ButtonVariant, string> = {
    primary: 'border-transparent bg-tf-action text-tf-inverse hover:bg-tf-action-hover active:bg-tf-action-active',
    secondary: 'border-tf-border bg-tf-surface text-tf-primary hover:bg-tf-surface-subtle',
    danger: 'border-transparent bg-tf-danger text-tf-inverse',
    ghost: 'border-transparent bg-transparent text-tf-primary hover:bg-tf-surface-subtle',
  };
  protected readonly sizeClasses: Record<ButtonSize, string> = {
    sm: 'min-h-8 px-tf-3 py-tf-1', md: 'min-h-10 px-tf-4 py-tf-2', lg: 'min-h-12 px-tf-5 py-tf-3',
  };

  protected onClick(event: MouseEvent): void {
    this.pressed.emit(event);
  }
}
