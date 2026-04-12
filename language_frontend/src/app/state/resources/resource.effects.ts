import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createResource,
  createResourceFailure,
  createResourceSuccess,
  getMyResources,
  getMyResourcesFailure,
  getMyResourcesSuccess
} from "src/app/state/resources/resource.actions";
import { catchError, of, map, switchMap } from "rxjs";
import { ResourceService } from "src/app/services/resource.service";
import { HttpErrorResponse } from "@angular/common/http";

export const getMyResourcesEffect = createEffect(
  (
    actions$ = inject(Actions),
    resourceService = inject(ResourceService)
  ) => {
    return actions$.pipe(
      ofType(getMyResources),
      switchMap((options) =>
        resourceService.getMyResources(options).pipe(
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

