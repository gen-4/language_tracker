import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from 'src/app/app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authInterceptor } from 'src/app/services/auth.interceptor';
import { authReducer } from 'src/app/state/authentication/authentication.reducer';
import { loginEffect, signupEffect } from 'src/app/state/authentication/authentication.effects';
import { resourceReducer } from 'src/app/state/resources/resource.reducer';
import { getMyResourcesEffect } from 'src/app/state/resources/resource.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideStore({
      auth: authReducer,
      resources: resourceReducer
    }),
    provideEffects({ loginEffect, signupEffect, getMyResourcesEffect }),
    provideHttpClient(withInterceptors([authInterceptor]), withFetch())
  ]
};
