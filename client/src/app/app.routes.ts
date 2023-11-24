import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { userGuard } from './shared/guards/user.guard';
import { tokenResolver } from './shared/resolvers/token.resolver';
import { ClientRoutes } from './shared/utils/client.routes';
import { provideEffects } from '@ngrx/effects';
import * as userEffects from './stores/user/user.effect';
import * as contactEffects from './stores/contacts/contacts.effect';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./shared/components/landing-page/landing-page.component').then(
        (m) => m.LandingPageComponent
      ),
  },
  {
    path: 'auth',
    resolve: [authGuard],
    loadChildren: () =>
      import('./routes/auth/auth.routes').then((m) => m.routes),
    providers: [],
  },
  {
    path: 'user',
    canActivate: [userGuard],
    resolve: [tokenResolver],
    loadChildren: () =>
      import('./routes/user/user.routes').then((m) => m.routes),
    providers: [provideEffects([userEffects, contactEffects])],
  },
  // {
  //   path: '**',
  //   pathMatch: 'full',
  //   redirectTo: ClientRoutes.Home, // need to change after we create blog timeline
  // },
];
