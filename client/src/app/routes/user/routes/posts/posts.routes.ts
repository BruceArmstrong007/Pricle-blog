import { Routes } from '@angular/router';
import { ClientRoutes } from '../../../../shared/utils/client.routes';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./posts.component'),
    children: [
      {
        path: 'create',
        loadComponent: () =>
          import('./routes/create-post/create-post.component'),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: ClientRoutes.User.Posts.Create,
      },
    ],
  },
];

export default routes;
