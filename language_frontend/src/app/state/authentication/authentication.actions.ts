import { createAction, props } from "@ngrx/store";
import { AuthRequest, User } from 'src/app/entities/user.model';

export const login = createAction(
  '[Login Page] Log User',
  props<{ credentials: AuthRequest }>()
);

export const loginSuccess = createAction(
  '[Login Page] Log User Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Login Page] Log User Error',
  props<{ error: string }>()
);

export const logout = createAction(
  '[Logout Button] Logout User'
);

export const signup = createAction(
  '[Signup Page] Signup User',
  props<{ credentials: AuthRequest }>()
);

export const signupSuccess = createAction(
  '[Signup Page] Signup User Success'
);

export const signupFailure = createAction(
  '[Signup Page] Signup User Error',
  props<{ error: string }>()
);

export const loginFromToken = createAction(
  '[Home Page] Login from token'
);

export const loginFromTokenFailure = createAction(
  '[Home Page] Login from token Failure'
);
