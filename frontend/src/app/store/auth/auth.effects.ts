import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../shared/ui/toast/toast.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  readonly login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((user) => AuthActions.loginSuccess({ user })),
          catchError((err) => of(AuthActions.loginFailure({ error: err.error?.message ?? 'Login failed.' }))),
        ),
      ),
    ),
  );

  readonly loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.toast.show('Logged in successfully.', 'success');
          this.router.navigate(['/dashboard']);
        }),
      ),
    { dispatch: false },
  );

  readonly register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(({ data }) =>
        this.authService.register(data).pipe(
          map((user) => AuthActions.registerSuccess({ user })),
          catchError((err) => of(AuthActions.registerFailure({ error: err.error?.message ?? 'Registration failed.' }))),
        ),
      ),
    ),
  );

  readonly registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => {
          this.toast.show('Account created successfully.', 'success');
          this.router.navigate(['/dashboard']);
        }),
      ),
    { dispatch: false },
  );

  readonly logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.logoutComplete()),
          catchError(() => of(AuthActions.logoutComplete())),
        ),
      ),
    ),
  );

  readonly logoutComplete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutComplete),
        tap(() => {
          this.toast.show('Logged out.', 'info');
          this.router.navigate(['/login']);
        }),
      ),
    { dispatch: false },
  );

  readonly loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUser),
      exhaustMap(() =>
        this.authService.getMe().pipe(
          map((user) => AuthActions.loadUserSuccess({ user })),
          catchError(() => of(AuthActions.loadUserFailure())),
        ),
      ),
    ),
  );
}
