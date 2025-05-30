import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { HomeComponent } from './pages/home/home.component';
import { IscrizioneComponent } from './pages/iscrizione/iscrizione.component';
import { MangaComponent } from './pages/manga/manga.component';
import { ChatGroupComponent } from './pages/chat-group/chat-group.component';
import { GamesComponent } from './pages/games/games.component';
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
    path: 'iscrizione',
    component: IscrizioneComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent,
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
