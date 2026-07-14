import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        // path: 'login',
        // loadComponent: () =>
        //   import('./components/login/login.component').then(
        //     (m) => m.LoginComponent,
        //   ),
        // canActivate: [notAuthGuard],
      },
    ],
  },
];
