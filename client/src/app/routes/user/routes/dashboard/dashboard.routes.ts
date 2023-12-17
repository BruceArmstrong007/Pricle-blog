import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard.component'),
    children: [
      {
        path: 'search',
        loadComponent: () => import('./routes/search/search.component'),
      },
    ],
  },
];

export default routes;
