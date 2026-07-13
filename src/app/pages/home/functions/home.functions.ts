import { ToggleProps } from '../../../../library/interfaces/toggle.interface';

export function getToggleProps(): ToggleProps[] {
  return [
    {
      titolo: 'Account',
      icona: 'bi bi-person-circle',
      menuElementi: [
        {
          testo: 'Profilo',
          icona: 'bi bi-person',
          condition: true,
          azione: () => {},
        },
        {
          testo: 'Impostazioni',
          icona: 'bi bi-gear',
          condition: true,
          azione: () => {},
        },
      ],
    },
    {
      titolo: 'Auth',
      icona: 'bi bi-three-dots',
      menuElementi: [
        {
          testo: 'Esci',
          icona: 'bi bi-box-arrow-right',
          condition: true,
          azione: () => {},
        },
      ],
    },
  ];
}
