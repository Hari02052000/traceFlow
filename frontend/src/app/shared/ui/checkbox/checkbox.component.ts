import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../form-controls/control-value-accessor';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CheckboxComponent), multi: true }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent extends ValueAccessor<boolean> {
  @Input({ required: true }) label = '';
  @Input() inputId = '';
  @Input() describedBy = '';

  protected onCheckboxChange(event: Event): void {
    this.updateValue((event.target as HTMLInputElement).checked);
  }
}
