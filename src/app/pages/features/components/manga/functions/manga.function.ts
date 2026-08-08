import { RaggioPage } from '../../../../../../library/interfaces/pagination.interface';
import { ISidebarItem } from '../../../../../../library/interfaces/sidebar.interface';
import { iTab } from '../../../../../../library/interfaces/tabs.interface';
import { OpereToolbar } from '../../../../../shared/interfaces/opere.interface';

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

export function getMangaSidebarSub(): ISidebarItem[] {
  return [
    {
      id: 'tutti',
      nome: 'Tutti',
      icona: 'bi-grid',
    },
    {
      id: 'preferiti',
      nome: 'Preferiti',
      icona: 'bi-heart',
    },
  ];
}

export function getMangaToolbar(
  manga: number,
  capitoli: number,
): OpereToolbar[] {
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

export function defaultMangaArrayPags(): RaggioPage[] {
  return [
    {
      width: 1904,
      raggio: 5,
    },
    {
      width: 1592,
      raggio: 4,
    },
    {
      width: 1280,
      raggio: 3,
    },
    {
      width: 987,
      raggio: 2,
    },
    {
      width: 0,
      raggio: 1,
    },
  ];
}
