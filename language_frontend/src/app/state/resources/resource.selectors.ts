import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/state/app.state";
import { ResourceState } from "src/app/state/resources/resource.reducer";

export const selectResources = (state: AppState) => state.resources;

export const selectMyResources = createSelector(
  selectResources,
  (state: ResourceState) => state.myResources
);

export const selectMyResourcesCount = createSelector(
  selectResources,
  (state: ResourceState) => state.count
);

export const isLoading = createSelector(
  selectResources,
  (state: ResourceState) => state.status === 'loading'
);

export const selectError = createSelector(
  selectResources,
  (state: ResourceState) => state.error
);
