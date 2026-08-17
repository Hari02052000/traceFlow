import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { CheckboxComponent } from '../../../../shared/ui/checkbox/checkbox.component';
import { FormFieldComponent } from '../../../../shared/ui/form-field/form-field.component';
import { InputComponent } from '../../../../shared/ui/input/input.component';
import { PasswordInputComponent } from '../../../../shared/ui/password-input/password-input.component';

const passwordsMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
  control.get('password')?.value === control.get('confirmPassword')?.value ? null : { passwordMismatch: true };

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ButtonComponent, CardComponent, CheckboxComponent, FormFieldComponent, InputComponent, PasswordInputComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './register.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  private readonly formBuilder = inject(FormBuilder);
  protected readonly submitted = signal(false);
  protected readonly form = this.formBuilder.nonNullable.group(
    {
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      acceptedTerms: [false, [Validators.requiredTrue]],
    },
    { validators: passwordsMatch },
  );

  protected showError(controlName: 'name' | 'email' | 'password' | 'confirmPassword' | 'acceptedTerms'): boolean {
    const control = this.form.controls[controlName];
    return (control.invalid || (controlName === 'confirmPassword' && this.form.hasError('passwordMismatch'))) && (control.touched || this.submitted());
  }

  protected errorMessage(controlName: 'name' | 'email' | 'password' | 'confirmPassword' | 'acceptedTerms'): string {
    const control = this.form.controls[controlName];
    if (controlName === 'confirmPassword' && this.form.hasError('passwordMismatch')) return 'Passwords do not match.';
    if (controlName === 'acceptedTerms') return 'You must accept the terms to continue.';
    if (control.hasError('required')) return `${controlName === 'name' ? 'Full name' : controlName === 'email' ? 'Email' : 'Password'} is required.`;
    if (control.hasError('email')) return 'Enter a valid email address.';
    if (control.hasError('minlength')) return controlName === 'name' ? 'Enter at least 2 characters.' : 'Use at least 8 characters.';
    return '';
  }

  protected onSubmit(): void {
    this.submitted.set(true);
    this.form.markAllAsTouched();
  }
}
