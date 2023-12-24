import { Routes } from '@angular/router';
import { ClientRoutes } from '../../../../shared/utils/client.routes';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard.component'),
    children: [
      {
        path: 'search',
        loadComponent: () => import('./routes/search/search.component'),
      },
      {
        path: 'timeline',
        loadComponent: () => import('./routes/timeline/timeline.component'),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: ClientRoutes.User.Dashboard.Timeline,
      },
    ],
  },
];

export default routes;
