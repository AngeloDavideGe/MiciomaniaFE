import { Component, signal } from '@angular/core';
import { manga_imports } from './manga.import';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: manga_imports,
  templateUrl: './manga.component.html',
  styleUrl: './manga.component.scss',
})
export class MangaComponent {
  categorie = [
    {
      id: 'all',
      nome: 'Tutti i manga',
      icona: 'bi-grid',
    },
    {
      id: 'ongoing',
      nome: 'In Corso',
      icona: 'bi-play-circle',
    },
    {
      id: 'completed',
      nome: 'Completati',
      icona: 'bi-check2-square',
    },
    {
      id: 'recent',
      nome: 'Recenti',
      icona: 'bi-clock-history',
    },
    {
      id: 'fav',
      nome: 'I miei preferiti',
      icona: 'bi-star',
    },
    {
      id: 'later',
      nome: 'Da leggere',
      icona: 'bi-bookmark',
    },
  ];

  categoriaAttiva = signal<string>('all');
}
