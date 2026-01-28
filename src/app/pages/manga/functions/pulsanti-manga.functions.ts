import { DataHttp } from '../../../core/api/http.data';
import { PulsantiHeader } from '../../../shared/components/custom/header-custom.component';
import { TabsManga } from '../interfaces/filtri.interface';

export function getTabsManga(clickCalls: Function): TabsManga[] {
  return [
    {
      class: 'active',
      href: '#tutti',
      color: '#6c5ce7',
      testo: {
        it: 'Tutti',
        en: 'All',
      },
      clickCall: clickCalls(null, 0),
    },
    {
      class: '',
      href: '#in-corso',
      color: '#00b894',
      testo: {
        it: 'In corso',
        en: 'In progress',
      },
      clickCall: clickCalls(false, 1),
    },
    {
      class: '',
      href: '#terminati',
      color: '#e84393',
      testo: {
        it: 'Terminati',
        en: 'Completed',
      },
      clickCall: clickCalls(true, 2),
    },
  ];
}

export function getPulsanti(routerFunc: Function): PulsantiHeader[] {
  return [
    {
      click: () => routerFunc('/home'),
      disabled: false,
      titolo: {
        it: 'Torna alla Home',
        en: 'Back to Home',
      },
      icona: 'bi bi-house-door me-2',
    },
    {
      click: () => routerFunc('/manga/tuoi-manga'),
      disabled: !DataHttp.user(),
      titolo: {
        it: 'I tuoi Manga',
        en: 'Your Manga',
      },
      icona: 'bi bi-book me-2',
    },
    {
      click: () => routerFunc('/manga/manga-miciomani'),
      disabled: !DataHttp.user(),
      titolo: {
        it: 'Manga Miciomani',
        en: 'Miciomani Manga',
      },
      icona: 'bi bi-emoji-sunglasses me-2',
    },
  ];
}
