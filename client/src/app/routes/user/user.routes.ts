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
    ],
  },
];

export default routes;
