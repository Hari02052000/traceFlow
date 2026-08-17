import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { CheckboxComponent } from '../../../../shared/ui/checkbox/checkbox.component';
import { FormFieldComponent } from '../../../../shared/ui/form-field/form-field.component';
import { InputComponent } from '../../../../shared/ui/input/input.component';
import { PasswordInputComponent } from '../../../../shared/ui/password-input/password-input.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ButtonComponent, CardComponent, CheckboxComponent, FormFieldComponent, InputComponent, PasswordInputComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  private readonly formBuilder = inject(FormBuilder);
  protected readonly submitted = signal(false);
  protected readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  protected showError(controlName: 'email' | 'password'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || this.submitted());
  }

  protected errorMessage(controlName: 'email' | 'password'): string {
    const control = this.form.controls[controlName];
    if (control.hasError('required')) return `${controlName === 'email' ? 'Email' : 'Password'} is required.`;
    if (control.hasError('email')) return 'Enter a valid email address.';
    return '';
  }

  protected onSubmit(): void {
    this.submitted.set(true);
    this.form.markAllAsTouched();
  }
}
