import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/state/app.state";
import { AuthState } from "src/app/state/authentication/authentication.reducer";

export const selectUserStatus = (state: AppState) => state.auth;

export const selectUser = createSelector(
  selectUserStatus,
  (state: AuthState) => state.user ? state.user : null
);

export const selectIsLoading = createSelector(
  selectUserStatus,
  (state: AuthState) => state.status === 'loading'
);

export const selectIsLogged = createSelector(
  selectUserStatus,
  (state: AuthState) => state.status === 'logged'
);

export const selectError = createSelector(
  selectUserStatus,
  (state: AuthState) => state.error
);

// TODO: Add isUserUser or isUserAdmin
