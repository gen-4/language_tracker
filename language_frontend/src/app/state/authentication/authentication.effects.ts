import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginFailure, loginSuccess, signup, signupFailure, signupSuccess } from "src/app/state/authentication/authentication.actions";
import { catchError, of, map, switchMap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

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
          catchError((error: HttpErrorResponse) => of(loginFailure({ error: error.error[Object.keys(error.error)[0]] })))
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
          catchError((error: HttpErrorResponse) => of(signupFailure({ error: error.error[Object.keys(error.error)[0]] })))
        )
      )
    );
  },
  { functional: true }
);
