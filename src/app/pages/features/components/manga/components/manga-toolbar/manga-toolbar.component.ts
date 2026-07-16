import { Component, signal } from '@angular/core';
import { TabsIndyComponent } from '../../../../../../../library/components/tabs/tabs-indy.component';
import { iTab } from '../../../../../../../library/interfaces/tabs.interface';
import { TabellaIndyComponent } from '../../../../../../../library/components/table/table-indy.component';

@Component({
  selector: 'app-manga-toolbar',
  standalone: true,
  imports: [TabsIndyComponent, TabellaIndyComponent],
  templateUrl: './manga-toolbar.component.html',
  styleUrl: './manga-toolbar.component.scss',
})
export class MangaToolbarComponent {
  stats = signal([
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

  public tabs: iTab[] = [
    {
      id: 'tutti',
      label: 'Tutti',
      color: 'var(--primary-light)',
    },
    {
      id: 'in_corso',
      label: 'In corso',
      color: 'var(--primary-light)',
    },
    {
      id: 'completati',
      label: 'Completati',
      color: 'var(--primary-light)',
    },
  ];
}
