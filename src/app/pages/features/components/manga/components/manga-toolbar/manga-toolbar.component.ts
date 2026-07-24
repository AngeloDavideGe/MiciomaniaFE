import { Component, model, signal } from '@angular/core';

@Component({
  selector: 'app-manga-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './manga-toolbar.component.html',
  styleUrl: './manga-toolbar.component.scss',
})
export class MangaToolbarComponent {
  public searchQuery = model<string>('');
  public stats = signal([
    {
      icon: 'bi-book',
      value: '256',
      title: 'Manga disponibili',
    },
    {
      icon: 'bi-grid',
      value: '12.4K',
      title: 'Capitoli totali',
    },
    {
      icon: 'bi-people',
      value: '4.8K',
      title: 'Utenti lettori',
    },
  ]);
}
