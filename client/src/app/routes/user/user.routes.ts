import { Routes } from '@angular/router';
import { ClientRoutes } from '../../shared/utils/client.routes';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./user.component'),
    children: [
      {
        path: 'profile',
        loadComponent: () => import('./routes/profile/profile.component'),
      },
      {
        path: 'contacts',
        loadChildren: () => import('./routes/contact/contact.routes'),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./routes/dashboard/dashboard.routes'),
      },
      {
        path: 'settings',
        loadComponent: () => import('./routes/settings/settings.component'),
      },
      {
        path: 'help-support',
        loadComponent: () =>
          import('./routes/help-support/help-support.component'),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: ClientRoutes.User.Dashboard.Root,
      },
    ],
  },
];

export default routes;
