import { TabsManga } from '../interfaces/filtri.interface';

export function getTabsManga(clickCalls: Function[]): TabsManga[] {
  return [
    {
      class: 'active',
      href: '#tutti',
      color: '#6c5ce7',
      testo: 'Tutti',
      clickCall: clickCalls[0],
    },
    {
      class: '',
      href: '#in-corso',
      color: '#00b894',
      testo: 'In corso',
      clickCall: clickCalls[1],
    },
    {
      class: '',
      href: '#terminati',
      color: '#e84393',
      testo: 'Terminati',
      clickCall: clickCalls[2],
    },
  ];
}
