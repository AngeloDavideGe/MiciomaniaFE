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
        path: 'manga-miciomani',
        loadComponent: () =>
          import('./components/manga-miciomani/manga-miciomani.component').then(
            (m) => m.MangaMiciomaniComponent
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
