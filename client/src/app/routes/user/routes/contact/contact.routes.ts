import { Routes } from '@angular/router';
import { ClientRoutes } from '../../../../shared/utils/client.routes';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./contact.component'),
    children: [
      {
        path: 'friends',
        loadComponent: () => import('./routes/friends/friends.component'),
      },
      {
        path: 'sent-requests',
        loadComponent: () =>
          import('./routes/sent-requests/sent-requests.component'),
      },
      {
        path: 'received-requests',
        loadComponent: () =>
          import('./routes/received-requests/received-requests.component'),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: ClientRoutes.User.Contacts.Friends,
      },
    ],
  },
];

export default routes;
