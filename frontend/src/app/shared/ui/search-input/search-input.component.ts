import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../form-controls/control-value-accessor';

@Component({
  selector: 'app-search-input',
  standalone: true,
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SearchInputComponent), multi: true }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent extends ValueAccessor<string> {
  @Input() inputId = '';
  @Input() placeholder = 'Search';
  @Input() describedBy = '';
  @Output() queryChange = new EventEmitter<string>();

  protected onInput(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.updateValue(query);
    this.queryChange.emit(query);
  }

  protected clear(): void {
    this.updateValue('');
    this.queryChange.emit('');
  }
}
