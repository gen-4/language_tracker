import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  changeLanguage,
  changeLanguageFailure,
  changeLanguageSuccess,
  createResource,
  createResourceFailure,
  createResourceSuccess,
  getMyResources,
  getMyResourcesFailure,
  getMyResourcesSuccess,
} from "src/app/state/resources/resource.actions";
import { Store } from "@ngrx/store";
import { selectLanguage } from "src/app/state/resources/resource.selectors";
import { catchError, of, map, switchMap, withLatestFrom } from "rxjs";
import { ResourceService } from "src/app/services/resource.service";
import { HttpErrorResponse } from "@angular/common/http";

export const getMyResourcesEffect = createEffect(
  (
    actions$ = inject(Actions),
    resourceService = inject(ResourceService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(getMyResources),
      withLatestFrom(store.select(selectLanguage)),
      switchMap(([options, language]) =>
        resourceService.getMyResources({ ...options, language }).pipe(
          map(response => getMyResourcesSuccess(response)),
          catchError((error: HttpErrorResponse) => of(getMyResourcesFailure({ error: error.error[Object.keys(error.error)[0]] })))
        )
      )
    );
  },
  { functional: true }
);

export const createResourceEffect = createEffect(
  (
    actions$ = inject(Actions),
    resourceService = inject(ResourceService)
  ) => {
    return actions$.pipe(
      ofType(createResource),
      switchMap(({ request }) =>
        resourceService.createResource(request).pipe(
          map(response => createResourceSuccess({ resource: response })),
          catchError((error: HttpErrorResponse) => of(createResourceFailure({ error: error.error[Object.keys(error.error)[0]] })))
        )
      )
    );
  },
  { functional: true }
);

export const changeLanguageEffect = createEffect(
  (
    actions$ = inject(Actions),
    resourceService = inject(ResourceService)
  ) => {
    return actions$.pipe(
      ofType(changeLanguage),
      switchMap(({ request }) =>
        resourceService.changeLanguage(request).pipe(
          map(() => changeLanguageSuccess({ language: request.language })),
          catchError((error: HttpErrorResponse) => of(changeLanguageFailure({ error: error.error[Object.keys(error.error)[0]] })))
        )
      )
    );
  },
  { functional: true }
);

export const changeLanguageReloadResourcesEffect = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(changeLanguageSuccess),
      map(() => getMyResources({ page: 1 }))
    );
  },
  { functional: true }
);



