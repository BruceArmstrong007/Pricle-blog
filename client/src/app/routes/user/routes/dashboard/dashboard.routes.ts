import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard.component'),
    children: [
      {
        path: 'search',
        loadChildren: () => import('./routes/search/search.routes'),
      },  
    ],
  },
];

export default routes;
