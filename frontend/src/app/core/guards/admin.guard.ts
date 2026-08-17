import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserRole } from '../../store/auth/auth.selectors';

export const adminGuard: CanMatchFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const role = store.selectSignal(selectUserRole)();
  return role === 'ADMIN' ? true : router.createUrlTree(['/dashboard']);
};
