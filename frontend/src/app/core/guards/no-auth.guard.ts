import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';

export const noAuthGuard: CanMatchFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const isAuthenticated = store.selectSignal(selectIsAuthenticated)();
  return !isAuthenticated ? true : router.createUrlTree(['/dashboard']);
};
