import { Routes } from '@angular/router';
import { errorGuard } from '../library/guards/error.guard';

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
    // loadChildren: () =>
    //   import('./pages/home/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./pages/auth/auth.component').then((m) => m.AuthComponent),
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'error-page',
    loadComponent: () =>
      import('./../library/dialogs/error.component').then(
        (m) => m.ErrorPageComponent,
      ),
    canActivate: [errorGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
