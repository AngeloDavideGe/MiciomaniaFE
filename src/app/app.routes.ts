import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { ChatGroupComponent } from './pages/chat-group/chat-group.component';
import { GamesComponent } from './pages/games/games.component';
import { HomeComponent } from './pages/home/home.component';
import { MangaComponent } from './pages/manga/manga.component';
import { SongComponent } from './pages/song/song.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    loadChildren: () =>
      import('./pages/home/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'manga',
    component: MangaComponent,
    loadChildren: () =>
      import('./pages/manga/manga.routes').then((m) => m.MANGA_ROUTES),
  },
  {
    path: 'canzoni',
    component: SongComponent,
  },
  {
    path: 'games',
    component: GamesComponent,
    loadChildren: () =>
      import('./pages/games/games.routes').then((m) => m.GAMES_ROUTES),
  },
  {
    path: 'chat-group',
    component: ChatGroupComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
