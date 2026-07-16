import { PulsanteNavbar } from '../../../../library/interfaces/navbar.interface';

export function getFeatureNavbar(): PulsanteNavbar[] {
  return [
    {
      id: 'home',
      icon: 'bi-house',
      text: 'Home',
      azione: () => {},
    },
  ];
}

export function getBottomNavItems(): PulsanteNavbar[] {
  return [
    {
      id: 'home',
      icon: 'bi-house',
      text: 'Home',
      azione: () => {},
    },
    {
      id: 'search',
      icon: 'bi-search',
      text: 'Cerca',
      azione: () => {},
    },
    {
      id: 'add',
      icon: 'bi-plus-circle',
      text: 'Nuovo',
      azione: () => {},
    },
    {
      id: 'notifications',
      icon: 'bi-heart',
      text: 'Notifiche',
      azione: () => {},
    },
    {
      id: 'profile',
      icon: 'bi-person',
      text: 'Profilo',
      azione: () => {},
    },
  ];
}
