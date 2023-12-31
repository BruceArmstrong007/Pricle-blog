import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { userGuard } from './shared/guards/user.guard';
import { tokenResolver } from './shared/resolvers/token.resolver';
import { ClientRoutes } from './shared/utils/client.routes';
import { provideEffects } from '@ngrx/effects';
import * as userEffects from './stores/user/user.effect';
import * as contactEffects from './stores/contacts/contacts.effect';
import { landingPageGuard } from './shared/guards/landing-page.guard';

export const routes: Routes = [
  {
    path: 'auth',
    resolve: [authGuard],
    loadChildren: () => import('./routes/auth/auth.routes'),
  },
  {
    path: 'user',
    canActivate: [userGuard],
    resolve: [tokenResolver],
    loadChildren: () => import('./routes/user/user.routes'),
    providers: [provideEffects([userEffects, contactEffects])],
  },
  {
    path: 'home',
    canActivate: [landingPageGuard],
    loadComponent: () =>
      import('./shared/components/landing-page/landing-page.component'),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ClientRoutes.Home,
  },
];
