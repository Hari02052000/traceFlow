import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import * as AuthActions from '../../store/auth/auth.actions';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);

  return next(req).pipe(
    tap({
      error: (err) => {
        if (err.status === 401) {
          store.dispatch(AuthActions.sessionExpired());
        }
      },
    }),
  );
};
