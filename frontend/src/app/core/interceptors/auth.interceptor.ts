import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import * as AuthActions from '../../store/auth/auth.actions';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const router = inject(Router);

  return next(req).pipe(
    tap({
      error: (err) => {
        if (err.status === 401) {
          store.dispatch(AuthActions.logoutComplete());
          router.navigate(['/login']);
        }
      },
    }),
  );
};
