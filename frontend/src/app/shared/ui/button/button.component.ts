import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

 type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
 type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
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

  protected onClick(event: MouseEvent): void {
    this.pressed.emit(event);
  }
}
