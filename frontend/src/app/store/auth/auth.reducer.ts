import { createReducer, on } from '@ngrx/store';
import { User } from '../../core/models/auth.models';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(AuthActions.register, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.registerSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(AuthActions.registerFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(AuthActions.logout, (state) => ({ ...state, loading: true })),
  on(AuthActions.logoutComplete, () => initialState),

  on(AuthActions.loadUser, (state) => ({ ...state, loading: true })),
  on(AuthActions.loadUserSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(AuthActions.loadUserFailure, (state) => ({ ...state, loading: false })),
);
