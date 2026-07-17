import { ISidebarItem } from '../../../../../../library/interfaces/sidebar.interface';
import { iTab } from '../../../../../../library/interfaces/tabs.interface';

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
    {
      id: 'utenti',
      nome: 'Degli utenti',
      icona: 'bi-check2-square',
    },
  ];
}
