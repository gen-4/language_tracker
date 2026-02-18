import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginFailure, loginSuccess, signup, signupFailure, signupSuccess } from "./authentication.actions";
import { catchError, of, map, switchMap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService)
  ) => {
    return actions$.pipe(
      ofType(login),
      switchMap(({ credentials }) =>
        authService.login(credentials).pipe(
          map(response => loginSuccess({ user: response.user })),
          catchError(error => of(loginFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const signupEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(signup),
      switchMap(({ credentials }) =>
        authService.signup(credentials).pipe(
          map(() => {
            router.navigateByUrl("/login");
            return signupSuccess();
          }),
          catchError(error => of(signupFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);
