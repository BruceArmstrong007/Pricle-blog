import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { authFeature } from './stores/auth/auth.reducer';
import { userFeature } from './stores/user/user.reducer';
import { contactsFeature } from './stores/contacts/contacts.reducer';
import { CustomRouterStateSerializer } from './shared/router-store/router-serializer';
import { RequestInterceptor } from './shared/interceptors/request.interceptor';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { alertFeature } from './stores/alert/alert.reducer';
// import * as authEffects from './stores/auth/auth.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideStore({
      router: routerReducer,
      auth: authFeature.reducer,
      user: userFeature.reducer,
      contacts: contactsFeature.reducer,
      alerts: alertFeature.reducer
    }),
    // provideEffects([authEffects]),
    provideRouterStore({ serializer: CustomRouterStateSerializer }),
    provideHttpClient(),
    provideAnimations(),
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    isDevMode()
      ? provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
      : [],
  ],
};
