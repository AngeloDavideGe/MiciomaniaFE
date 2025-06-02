import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profilo/:id',
        loadComponent: () =>
          import('./components/pages/profilo/profilo.component').then(
            (m) => m.ProfiloComponent
          ),
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('./components/pages/admin/admin.component').then(
            (m) => m.AdminComponent
          ),
      },
      {
        path: 'elementi-utente',
        loadComponent: () =>
          import(
            './components/pages/elementi-utente/elementi-utente.component'
          ).then((m) => m.ElementiUtenteComponent),
      },
      {
        path: 'squadre',
        loadComponent: () =>
          import('./components/pages/squadre/squadre.component').then(
            (m) => m.SquadreComponent
          ),
      },
    ],
  },
];
