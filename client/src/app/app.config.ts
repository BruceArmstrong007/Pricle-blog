import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideStore } from '@ngrx/store';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { authFeature } from './stores/auth/auth.reducer';
import { userFeature } from './stores/user/user.reducer';
import { contactsFeature } from './stores/contacts/contacts.reducer';
import { CustomRouterStateSerializer } from './shared/router-store/router-serializer';
import { RequestInterceptor } from './shared/interceptors/request.interceptor';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { alertFeature } from './stores/alert/alert.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
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
    provideRouterStore({ serializer: CustomRouterStateSerializer }),
    provideHttpClient(),
    provideAnimations(),
    isDevMode()
      ? provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
      : [],
  ],
};
