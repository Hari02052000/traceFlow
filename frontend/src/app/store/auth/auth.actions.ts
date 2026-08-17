import { createAction, props } from '@ngrx/store';
import { LoginRequest, RegisterRequest, User } from '../../core/models/auth.models';

export const login = createAction('[Auth] Login', props<{ credentials: LoginRequest }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

export const register = createAction('[Auth] Register', props<{ data: RegisterRequest }>());
export const registerSuccess = createAction('[Auth] Register Success', props<{ user: User }>());
export const registerFailure = createAction('[Auth] Register Failure', props<{ error: string }>());

export const logout = createAction('[Auth] Logout');
export const logoutComplete = createAction('[Auth] Logout Complete');

export const loadUser = createAction('[Auth] Load User');
export const loadUserSuccess = createAction('[Auth] Load User Success', props<{ user: User }>());
export const loadUserFailure = createAction('[Auth] Load User Failure');
