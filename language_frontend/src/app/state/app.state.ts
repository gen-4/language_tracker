import { AuthState } from "src/app/state/authentication/authentication.reducer";
import { ResourceState } from "src/app/state/resources/resource.reducer";

export interface AppState {
  auth: AuthState;
  resources: ResourceState;
}
