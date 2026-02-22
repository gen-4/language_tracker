import { createReducer, on } from '@ngrx/store';
import { Resource } from 'src/app/entities/resource.model';
import { getMyResourcesFailure, getMyResourcesSuccess, getMyResources } from 'src/app/state/resources/resource.actions';

export interface ResourceState {
  myResources: Resource[];
  error: string | null;
  status: 'loaded' | 'loading';
}

export const initialState: ResourceState = {
  myResources: [],
  error: null,
  status: 'loaded'
};

export const resourceReducer = createReducer(
  initialState,

  on(getMyResources, (state) => ({
    ...state,
    error: null,
    status: 'loading'
  })),

  on(getMyResourcesSuccess, (state, { resources }) => {
    return ({
      ...state,
      myResources: resources,
      status: 'loaded'
    })
  }),

  on(getMyResourcesFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'loaded'
  })),
);
