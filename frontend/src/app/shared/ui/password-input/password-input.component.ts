import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../form-controls/control-value-accessor';

@Component({
  selector: 'app-password-input',
  standalone: true,
  templateUrl: './password-input.component.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PasswordInputComponent), multi: true }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordInputComponent extends ValueAccessor<string> {
  @Input() inputId = '';
  @Input() placeholder = '';
  @Input() autocomplete = 'current-password';
  @Input() invalid = false;
  @Input() describedBy = '';
  protected visible = false;

  protected onInput(event: Event): void {
    this.updateValue((event.target as HTMLInputElement).value);
  }

  protected toggleVisibility(): void {
    this.visible = !this.visible;
  }
}
