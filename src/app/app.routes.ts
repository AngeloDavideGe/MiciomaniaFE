import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    loadChildren: () =>
      import('./pages/home/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./pages/auth/auth.component').then((m) => m.AuthComponent),
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./pages/posts/posts.component').then((m) => m.PostsComponent),
    loadChildren: () =>
      import('./pages/posts/posts.routes').then((m) => m.POSTS_ROUTES),
  },
  {
    path: 'manga',
    loadComponent: () =>
      import('./pages/manga/manga.component').then((m) => m.MangaComponent),
    loadChildren: () =>
      import('./pages/manga/manga.routes').then((m) => m.MANGA_ROUTES),
  },
  {
    path: 'games',
    loadComponent: () =>
      import('./pages/games/games.component').then((m) => m.GamesComponent),
    loadChildren: () =>
      import('./pages/games/games.routes').then((m) => m.GAMES_ROUTES),
  },
  {
    path: 'canzoni',
    loadComponent: () =>
      import('./pages/song/song.component').then((m) => m.SongComponent),
  },
  {
    path: 'math',
    loadComponent: () =>
      import('./pages/math/math.component').then((m) => m.MathComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
