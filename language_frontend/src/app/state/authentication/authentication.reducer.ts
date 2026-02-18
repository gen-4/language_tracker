import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/entities/user.model';
import { login, loginFailure, loginSuccess, logout, signup, signupFailure, signupSuccess } from './authentication.actions';

export interface AuthState {
  user: User | null;
  error: string | null;
  status: 'unlogged' | 'logged' | 'loading';
}

export const initialState: AuthState = {
  user: null,
  error: null,
  status: 'unlogged'
};

export const authReducer = createReducer(
  initialState,

  on(logout, (state) => ({
    ...state,
    user: null,
    status: 'unlogged'
  })),

  on(login, (state) => ({
    ...state,
    error: null,
    status: 'loading'
  })),

  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    status: 'logged'
  })),

  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'unlogged'
  })),

  on(signup, (state) => ({
    ...state,
    user: null,
    status: 'loading'
  })),

  on(signupSuccess, (state) => ({
    ...state,
    status: 'unlogged'
  })),

  on(signupFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'unlogged'
  }))
);
