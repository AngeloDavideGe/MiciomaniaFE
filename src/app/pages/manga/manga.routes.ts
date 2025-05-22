import { Routes } from '@angular/router';

export const MANGA_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'tuoi-manga',
        loadComponent: () =>
          import('./components/tuoi-manga/tuoi-manga.component').then(
            (m) => m.TuoiMangaComponent
          ),
      },
      {
        path: ':nome',
        loadComponent: () =>
          import('./components/volumi-manga/volumi-manga.component').then(
            (m) => m.VolumiMangaComponent
          ),
      },
    ],
  },
];
