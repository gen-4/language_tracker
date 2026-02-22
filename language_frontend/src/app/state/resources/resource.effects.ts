import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getMyResources, getMyResourcesFailure, getMyResourcesSuccess } from "src/app/state/resources/resource.actions";
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
      switchMap(() =>
        resourceService.getMyResources().pipe(
          map(response => getMyResourcesSuccess({ resources: response })),
          catchError((error: HttpErrorResponse) => of(getMyResourcesFailure({ error: error.error[Object.keys(error.error)[0]] })))
        )
      )
    );
  },
  { functional: true }
);

