import { Routes } from '@angular/router';
import { notAuthGuard } from '../../core/guards/auth.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login.component').then((m) => m.LoginComponent),
        // canActivate: [notAuthGuard],
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register.component').then(
            (m) => m.RegisterComponent,
          ),
        // canActivate: [notAuthGuard],
      },
    ],
  },
];
