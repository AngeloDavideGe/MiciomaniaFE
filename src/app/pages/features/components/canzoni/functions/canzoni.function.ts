import { RaggioPage } from '../../../../../../library/interfaces/pagination.interface';
import { ISidebarItem } from '../../../../../../library/interfaces/sidebar.interface';
import { OpereToolbar } from '../../../../../shared/interfaces/opere.interface';

export function getCanzoniToolbar(
  album: number,
  canzoni: number,
): OpereToolbar[] {
  return [
    {
      icon: 'bi-book',
      value: album,
      title: 'Album disponibili',
    },
    {
      icon: 'bi-grid',
      value: canzoni,
      title: 'Canozni totali',
    },
  ];
}

export function getCanzoniSidebar(): ISidebarItem[] {
  return [
    {
      id: 'tutte',
      nome: 'Tutte',
      icona: 'bi-grid',
    },
    {
      id: 'preferite',
      nome: 'Preferite',
      icona: 'bi-play-circle',
    },
  ];
}

export function defaultCanzoniArrayPags(): RaggioPage[] {
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
