import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../form-controls/control-value-accessor';

@Component({
  selector: 'app-textarea',
  standalone: true,
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.css',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextareaComponent), multi: true }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent extends ValueAccessor<string> {
  @Input() inputId = '';
  @Input() placeholder = '';
  @Input() rows = 4;
  @Input() invalid = false;
  @Input() describedBy = '';

  protected onInput(event: Event): void {
    this.updateValue((event.target as HTMLTextAreaElement).value);
  }
}
