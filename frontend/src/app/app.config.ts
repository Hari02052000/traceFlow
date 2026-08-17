import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { Router, provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { APP_INITIALIZER } from '@angular/core';
import { Store } from '@ngrx/store';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { responseInterceptor } from './core/interceptors/response.interceptor';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { batchReducer } from './store/batch/batch.reducer';
import { BatchEffects } from './store/batch/batch.effects';
import { loadUser } from './store/auth/auth.actions';
import { selectAuthLoaded } from './store/auth/auth.selectors';
import { filter, take } from 'rxjs';

function initializeApp(store: Store): () => Promise<void> {
  return () => {
    store.dispatch(loadUser());
    return new Promise<void>((resolve) => {
      const sub = store.select(selectAuthLoaded).subscribe((loaded) => {
        if (loaded) {
          sub.unsubscribe();
          resolve();
        }
      });
    });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, responseInterceptor])),
    provideStore({ auth: authReducer, batch: batchReducer }),
    provideEffects([AuthEffects, BatchEffects]),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [Store],
      multi: true,
    },
  ],
};
