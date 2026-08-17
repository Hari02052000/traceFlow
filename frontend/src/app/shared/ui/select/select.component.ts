import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../form-controls/control-value-accessor';

export interface SelectOption { value: string; label: string; disabled?: boolean; }

@Component({
  selector: 'app-select',
  standalone: true,
  templateUrl: './select.component.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectComponent), multi: true }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent extends ValueAccessor<string> {
  @Input() inputId = '';
  @Input() placeholder = 'Select an option';
  @Input() options: readonly SelectOption[] = [];
  @Input() invalid = false;
  @Input() describedBy = '';

  protected onSelect(event: Event): void {
    this.updateValue((event.target as HTMLSelectElement).value || null);
  }
}
