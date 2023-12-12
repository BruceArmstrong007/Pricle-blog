import { Routes } from '@angular/router';

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
        path: 'settings',
        loadComponent: () => import('./routes/settings/settings.component'),
      },
      {
        path: 'help-support',
        loadComponent: () =>
          import('./routes/help-support/help-support.component'),
      },
    ],
  },
];

export default routes;
