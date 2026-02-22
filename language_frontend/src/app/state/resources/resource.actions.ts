import { createAction, props } from "@ngrx/store";
import { Resource } from 'src/app/entities/resource.model';

export const getMyResources = createAction(
  '[My Resources Page] Get my resources'
);

export const getMyResourcesSuccess = createAction(
  '[My Resources Page] Get my resources Success',
  props<{ resources: Resource[] }>()
);

export const getMyResourcesFailure = createAction(
  '[My Resources Page] Get my resources Error',
  props<{ error: string }>()
);

