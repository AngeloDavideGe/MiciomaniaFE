import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login.component').then((m) => m.LoginComponent),
        canActivate: [authGuard],
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register.component').then(
            (m) => m.RegisterComponent,
          ),
        canActivate: [authGuard],
      },
    ],
  },
];
