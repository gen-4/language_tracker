import { createReducer, on } from '@ngrx/store';
import { Resource } from 'src/app/entities/resource.model';
import {
  getMyResourcesFailure,
  getMyResourcesSuccess,
  getMyResources,
  createResourcesValidationError,
  createResourcesClearValidationError,
  createResource,
  createResourceSuccess,
  createResourceFailure,
} from 'src/app/state/resources/resource.actions';

export interface ResourceState {
  myResources: Resource[];
  count: number;
  error: string | null;
  status: 'loaded' | 'loading';
}

export const initialState: ResourceState = {
  myResources: [],
  count: 0,
  error: null,
  status: 'loaded',
};

export const resourceReducer = createReducer(
  initialState,

  on(getMyResources, (state) => ({
    ...state,
    error: null,
    status: 'loading'
  })),

  on(getMyResourcesSuccess, (state, { resources, count }) => {
    return ({
      ...state,
      myResources: resources,
      count,
      status: 'loaded'
    })
  }),

  on(getMyResourcesFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'loaded'
  })),

  on(createResourcesValidationError, (state, { error }) => ({
    ...state,
    error,
    status: 'loaded'
  })),

  on(createResourcesClearValidationError, (state) => ({
    ...state,
    error: null,
    status: 'loaded'
  })),

  on(createResource, (state) => ({
    ...state,
    error: null,
    status: 'loading'
  })),

  on(createResourceSuccess, (state, { resource }) => ({
    ...state,
    myResources: [resource, ...state.myResources],
    count: state.count + 1,
    error: null,
    status: 'loaded',
  })),

  on(createResourceFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'loaded'
  })),

);
