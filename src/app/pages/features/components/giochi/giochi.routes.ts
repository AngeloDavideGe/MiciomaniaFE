import { Routes } from '@angular/router';

export const GIOCHI_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'tris',
        loadComponent: () =>
          import('./games/tris/tris.component').then((m) => m.TrisComponent),
      },
      {
        path: 'battagliaNavale',
        loadComponent: () =>
          import('./games/battaglia-navale/battaglia-navale.component').then(
            (m) => m.BattagliaNavaleComponent,
          ),
      },
    ],
  },
];
