import { Routes } from '@angular/router';

export const FEATURE_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'manga',
        loadComponent: () =>
          import('./components/manga/manga.component').then(
            (m) => m.MangaComponent,
          ),
      },
      {
        path: 'canzoni',
        loadComponent: () =>
          import('./components/canzoni/canzoni.component').then(
            (m) => m.CanzoniComponent,
          ),
      },
      // {
      //   path: 'giochi',
      //   loadComponent: () =>
      //     import('./components/manga/manga.component').then(
      //       (m) => m.MangaComponent,
      //     ),
      // },
      // {
      //   path: 'post',
      //   loadComponent: () =>
      //     import('./components/manga/manga.component').then(
      //       (m) => m.MangaComponent,
      //     ),
      // },
      // {
      //   path: 'classifica',
      //   loadComponent: () =>
      //     import('./components/manga/manga.component').then(
      //       (m) => m.MangaComponent,
      //     ),
      // },
    ],
  },
];
