import { PulsanteNavbar } from '../../../../library/interfaces/navbar.interface';

export function getPulsantiHomeNavbar(): PulsanteNavbar[] {
  return [
    {
      id: 'notifiche',
      icon: 'bi bi-bell',
      text: 'Notifiche',
      azione: () => {},
    },
    {
      id: 'impostazioni',
      icon: 'bi bi-gear',
      text: 'Impostazioni',
      azione: () => {},
    },
  ];
}
