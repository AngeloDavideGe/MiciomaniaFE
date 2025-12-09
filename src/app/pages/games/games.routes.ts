import { Routes } from '@angular/router';

export const GAMES_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'tris',
        loadComponent: () =>
          import('./components/pages/tris/tris.component').then(
            (m) => m.TrisComponent
          ),
      },
      {
        path: 'forza-4',
        loadComponent: () =>
          import('./components/pages/forza-4/forza-4.component').then(
            (m) => m.Forza4Component
          ),
      },
      {
        path: 'quiz',
        loadComponent: () =>
          import('./components/pages/quiz/quiz.component').then(
            (m) => m.QuizComponent
          ),
      },
      {
        path: 'battaglia-navale',
        loadComponent: () =>
          import(
            './components/pages/battaglia-navale/battaglia-navale.component'
          ).then((m) => m.BattagliaNavaleComponent),
      },
      {
        path: 'memory',
        loadComponent: () =>
          import('./components/pages/memory/memory.component').then(
            (m) => m.MemoryComponent
          ),
      },
      {
        path: 'sudoku',
        loadComponent: () =>
          import('./components/pages/sudoku/sudoku.component').then(
            (m) => m.SudokuComponent
          ),
      },
    ],
  },
];
