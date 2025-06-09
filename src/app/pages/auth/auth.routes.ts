import { Routes } from '@angular/router';

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
      },
      {
        path: 'sign-in',
        loadComponent: () =>
          import('./components/sign-in/sign-in.component').then(
            (m) => m.SignInComponent
          ),
      },
    ],
  },
];
