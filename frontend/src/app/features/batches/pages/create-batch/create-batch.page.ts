import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertComponent } from '../../../../shared/ui/alert/alert.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { FormFieldComponent } from '../../../../shared/ui/form-field/form-field.component';
import { InputComponent } from '../../../../shared/ui/input/input.component';
import { PageHeaderComponent } from '../../../../shared/layout/page-header/page-header.component';
import { createBatch } from '../../../../store/batch/batch.actions';
import { selectBatchCreateError, selectBatchCreateLoading } from '../../../../store/batch/batch.selectors';

@Component({
  selector: 'app-create-batch-page',
  standalone: true,
  imports: [AlertComponent, ButtonComponent, CardComponent, FormFieldComponent, InputComponent, PageHeaderComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './create-batch.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBatchPage {
  private readonly formBuilder = inject(FormBuilder);
  private readonly store = inject(Store);

  protected readonly submitted = signal(false);
  protected readonly errorDismissed = signal(false);
  protected readonly loading = this.store.selectSignal(selectBatchCreateLoading);
  protected readonly error = this.store.selectSignal(selectBatchCreateError);

  protected readonly form = this.formBuilder.nonNullable.group({
    batchNumber: ['', [Validators.required]],
    productName: ['', [Validators.required]],
    origin: ['', [Validators.required]],
    quantity: [0, [Validators.required, Validators.min(1)]],
    unit: ['', [Validators.required]],
  });

  protected showError(controlName: 'batchNumber' | 'productName' | 'origin' | 'quantity' | 'unit'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || this.submitted());
  }

  protected errorMessage(controlName: 'batchNumber' | 'productName' | 'origin' | 'quantity' | 'unit'): string {
    const control = this.form.controls[controlName];
    if (control.hasError('required')) {
      const labels: Record<string, string> = { batchNumber: 'Batch number', productName: 'Product name', origin: 'Origin', quantity: 'Quantity', unit: 'Unit' };
      return `${labels[controlName]} is required.`;
    }
    if (control.hasError('min')) return 'Quantity must be at least 1.';
    return '';
  }

  protected dismissError(): void {
    this.errorDismissed.set(true);
  }

  protected onSubmit(): void {
    this.submitted.set(true);
    this.errorDismissed.set(false);
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.store.dispatch(createBatch({ data: this.form.getRawValue() }));
    }
  }
}
