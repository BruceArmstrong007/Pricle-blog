import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./user.component'),
    children: [],
  },
];

export default routes;
