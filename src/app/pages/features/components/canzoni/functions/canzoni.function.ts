import { ISidebarItem } from '../../../../../../library/interfaces/navbar.interface';
import { RaggioPage } from '../../../../../../library/interfaces/pagination.interface';
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
      width: 1591.2,
      raggio: 4,
    },
    {
      width: 1279.2,
      raggio: 3,
    },
    {
      width: 986.4,
      raggio: 2,
    },
    {
      width: 0,
      raggio: 1,
    },
  ];
}
