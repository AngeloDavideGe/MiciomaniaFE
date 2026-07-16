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
    ],
  },
];
