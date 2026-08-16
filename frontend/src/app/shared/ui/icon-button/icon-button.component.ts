import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export type IconButtonVariant = 'secondary' | 'ghost' | 'danger';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent {
  @Input({ required: true }) ariaLabel = '';
  @Input() variant: IconButtonVariant = 'ghost';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Output() pressed = new EventEmitter<MouseEvent>();

  protected onClick(event: MouseEvent): void {
    this.pressed.emit(event);
  }
}
