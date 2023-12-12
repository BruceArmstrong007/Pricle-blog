import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./search.component'),
    children: [
      {
        path: 'people',
        loadComponent: () => import('./routes/people/people.component'),
      },
      {
        path: 'tags',
        loadComponent: () => import('./routes/tags/tags.component'),
      },
    ],
  },
];

export default routes;
