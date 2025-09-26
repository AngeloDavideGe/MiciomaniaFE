import { Routes } from '@angular/router';

export const POSTS_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profilo/:id',
        loadComponent: () =>
          import('./components/pages/profilo/profilo.component').then(
            (m) => m.ProfiloComponent
          ),
      },
      {
        path: 'ultimi-post',
        loadComponent: () =>
          import('./components/pages/ultimi-posts/ultimi-posts.component').then(
            (m) => m.UltimiPostsComponent
          ),
      },
    ],
  },
];
