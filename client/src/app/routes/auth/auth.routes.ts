import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth.component'),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./routes/login/login.component'),
      },
      {
        path: 'register',
        loadComponent: () => import('./routes/register/register.component'),
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./routes/reset-password/reset-password.component'),
      },
      {
        path: 'verify-account',
        loadComponent: () => import('./routes/verify-account/verify-account.component'),
      },
      {
        path: '**',
        loadComponent: () => import('./routes/login/login.component'),
      },
    ],
  },
];

export default routes;
