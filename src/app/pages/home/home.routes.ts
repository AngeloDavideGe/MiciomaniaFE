import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profilo/:id',
        loadComponent: () =>
          import('./components/profilo/profilo.component').then(
            (m) => m.ProfiloComponent
          ),
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('./components/admin/admin.component').then(
            (m) => m.AdminComponent
          ),
      },
      {
        path: 'elementi-utente',
        loadComponent: () =>
          import('./components/elementi-utente/elementi-utente.component').then(
            (m) => m.ElementiUtenteComponent
          ),
      },
      {
        path: 'squadre',
        loadComponent: () =>
          import('./components/squadre/squadre.component').then(
            (m) => m.SquadreComponent
          ),
      },
    ],
  },
];
