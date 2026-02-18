import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authInterceptor } from 'src/app/services/auth.interceptor';
import { authReducer } from 'src/app/state/authentication/authentication.reducer';
import { loginEffect, signupEffect } from 'src/app/state/authentication/authentication.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideStore({
      auth: authReducer
    }),
    provideEffects({ loginEffect }),
    provideEffects({ signupEffect }),
    provideHttpClient(withInterceptors([authInterceptor]), withFetch())
  ]
};
