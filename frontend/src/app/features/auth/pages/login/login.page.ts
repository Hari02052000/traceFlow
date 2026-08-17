import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlertComponent } from '../../../../shared/ui/alert/alert.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { CheckboxComponent } from '../../../../shared/ui/checkbox/checkbox.component';
import { FormFieldComponent } from '../../../../shared/ui/form-field/form-field.component';
import { InputComponent } from '../../../../shared/ui/input/input.component';
import { PasswordInputComponent } from '../../../../shared/ui/password-input/password-input.component';
import { selectAuthError, selectAuthLoading } from '../../../../store/auth/auth.selectors';
import { login } from '../../../../store/auth/auth.actions';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [AlertComponent, ButtonComponent, CardComponent, CheckboxComponent, FormFieldComponent, InputComponent, PasswordInputComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  private readonly formBuilder = inject(FormBuilder);
  private readonly store = inject(Store);
  protected readonly submitted = signal(false);
  protected readonly errorDismissed = signal(false);
  protected readonly loading = this.store.selectSignal(selectAuthLoading);
  protected readonly error = this.store.selectSignal(selectAuthError);
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

  protected dismissError(): void {
    this.errorDismissed.set(true);
  }

  protected onSubmit(): void {
    this.submitted.set(true);
    this.errorDismissed.set(false);
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const { email, password } = this.form.getRawValue();
      this.store.dispatch(login({ credentials: { email, password } }));
    }
  }
}
