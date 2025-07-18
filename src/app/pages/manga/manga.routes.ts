import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const MANGA_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'tuoi-manga',
        loadComponent: () =>
          import('./components/pages/tuoi-manga/tuoi-manga.component').then(
            (m) => m.TuoiMangaComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'manga-miciomani',
        loadComponent: () =>
          import(
            './components/pages/manga-miciomani/manga-miciomani.component'
          ).then((m) => m.MangaMiciomaniComponent),
      },
      {
        path: ':nome',
        loadComponent: () =>
          import('./components/pages/volumi-manga/volumi-manga.component').then(
            (m) => m.VolumiMangaComponent
          ),
      },
    ],
  },
];
