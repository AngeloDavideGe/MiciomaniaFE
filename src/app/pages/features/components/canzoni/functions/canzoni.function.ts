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
