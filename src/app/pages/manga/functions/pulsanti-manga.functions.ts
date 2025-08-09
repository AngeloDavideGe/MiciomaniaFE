import { DataHttp } from '../../../core/api/http.data';
import { TabsManga, PulsantiManga } from '../interfaces/filtri.interface';

export function getTabsManga(clickCalls: Function): TabsManga[] {
  return [
    {
      class: 'active',
      href: '#tutti',
      color: '#6c5ce7',
      testo: 'Tutti',
      clickCall: clickCalls(null, 0),
    },
    {
      class: '',
      href: '#in-corso',
      color: '#00b894',
      testo: 'In corso',
      clickCall: clickCalls(false, 1),
    },
    {
      class: '',
      href: '#terminati',
      color: '#e84393',
      testo: 'Terminati',
      clickCall: clickCalls(true, 2),
    },
  ];
}

export function getPulsanti(routerFunc: Function): PulsantiManga[] {
  return [
    {
      click: () => routerFunc('/home'),
      disabled: false,
      titolo: 'Torna alla Home',
      icona: 'bi bi-house-door me-2',
    },
    {
      click: () => routerFunc('/manga/tuoi-manga'),
      disabled: !DataHttp.user(),
      titolo: 'I tuoi Manga',
      icona: 'bi bi-book me-2',
    },
    {
      click: () => routerFunc('/manga/manga-miciomani'),
      disabled: !DataHttp.user(),
      titolo: 'Manga Miciomani',
      icona: 'bi bi-emoji-sunglasses me-2',
    },
  ];
}
