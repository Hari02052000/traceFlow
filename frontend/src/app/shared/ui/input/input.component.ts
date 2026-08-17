import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../form-controls/control-value-accessor';

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.component.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends ValueAccessor<string | number> {
  @Input() inputId = '';
  @Input() type: 'text' | 'email' | 'number' | 'tel' | 'url' = 'text';
  @Input() placeholder = '';
  @Input() autocomplete = '';
  @Input() invalid = false;
  @Input() describedBy = '';

  protected onInput(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    this.updateValue(this.type === 'number' ? (raw === '' ? null : Number(raw)) : raw);
  }
}
