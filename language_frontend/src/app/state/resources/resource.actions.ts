import { createAction, props } from "@ngrx/store";
import { Resource, ResourceRequest } from 'src/app/entities/resource.model';
import { PaginationParams } from "src/app/entities/common.model";

export const getMyResources = createAction(
  '[My Resources Page] Get my resources',
  props<PaginationParams>()
);

export const getMyResourcesSuccess = createAction(
  '[My Resources Page] Get my resources Success',
  props<{ resources: Resource[], count: number }>()
);

export const getMyResourcesFailure = createAction(
  '[My Resources Page] Get my resources Error',
  props<{ error: string }>()
);

export const createResourcesValidationError = createAction(
  '[My Resources Page] Create resource validation Error',
  props<{ error: string }>()
)

export const createResourcesClearValidationError = createAction(
  '[My Resources Page] Create resource clear validation Error'
)

export const createResource = createAction(
  '[My Resources Page] Create resource',
  props<{ request: ResourceRequest }>()
);

export const createResourceSuccess = createAction(
  '[My Resources Page] Create resource Success',
  props<{ resource: Resource }>()
);

export const createResourceFailure = createAction(
  '[My Resources Page] Create resource Failure',
  props<{ error: string }>()
);

