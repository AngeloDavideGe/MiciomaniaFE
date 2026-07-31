import { ISidebarItem } from '../../../../../../library/interfaces/sidebar.interface';
import { iTab } from '../../../../../../library/interfaces/tabs.interface';
import { abbreviateNumberFormat } from '../../../../../../library/pipes/number-format.pipe';
import { MangaToolbar } from '../interfaces/manga.interface';

export function getMangaTabs(): iTab[] {
  return [
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

export function getMangaSidebar(): ISidebarItem[] {
  return [
    {
      id: 'ufficiali',
      nome: 'Ufficiali',
      icona: 'bi-grid',
    },
    {
      id: 'miciomania',
      nome: 'Di Miciomania',
      icona: 'bi-play-circle',
    },
  ];
}

export function getMangaToolbar(
  manga: number,
  capitoli: number,
): MangaToolbar[] {
  return [
    {
      icon: 'bi-book',
      value: manga,
      title: 'Manga disponibili',
    },
    {
      icon: 'bi-grid',
      value: capitoli,
      title: 'Capitoli totali',
    },
  ];
}
