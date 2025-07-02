import { Routes } from '@angular/router';
import { authGuard, notAuthGuard } from '../../core/guards/auth.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(
            (m) => m.LoginComponent
          ),
        canActivate: [notAuthGuard],
      },
      {
        path: 'sign-in',
        loadComponent: () =>
          import('./components/sign-in/sign-in.component').then(
            (m) => m.SignInComponent
          ),
        canActivate: [notAuthGuard],
      },
      {
        path: 'iscrizione',
        loadComponent: () =>
          import('./components/iscrizione/iscrizione.component').then(
            (m) => m.IscrizioneComponent
          ),
        canActivate: [authGuard],
      },
    ],
  },
];
