import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { login, loginFailure, loginSuccess, signup, signupFailure, signupSuccess, logout, loginFromToken, loginFromTokenFailure } from "src/app/state/authentication/authentication.actions";
import { getMyResources } from "src/app/state/resources/resource.actions";
import { catchError, of, map, switchMap, tap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(login),
      switchMap(({ credentials }) =>
        authService.login(credentials).pipe(
          map(response => {
            router.navigateByUrl("/");
            return loginSuccess({ user: response.user });
          }),
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


export const loginFromTokenEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(loginFromToken),
      switchMap(() =>
        authService.loginFromToken().pipe(
          map(response => {
            router.navigateByUrl("/");
            return loginSuccess({ user: response });
          }),
          catchError((_) => {
            authService.logout();
            return of(loginFromTokenFailure());
          })
        )
      )
    );
  },
  { functional: true }
);

export const loginSuccessLoadResourcesEffect = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      ofType(loginSuccess),
      tap(() => {
        store.dispatch(getMyResources({ page: 1 }));
      })
    );
  },
  { functional: true, dispatch: false }
);

export const logoutEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
  ) => {
    return actions$.pipe(
      ofType(logout),
      tap(() => authService.logout())
    );
  },
  { functional: true, dispatch: false }
);
