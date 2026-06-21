import { iTab } from '../../../../library/components/tabs/tabs.component';
import { NavBarButton } from '../../../../library/interfaces/navbar.interface';
import { DataHttp } from '../../../core/api/http.data';

export function getTabsManga(clickCalls: Function): iTab[] {
  return [
    {
      id: 'tutti',
      label: 'Tutti',
      color: 'var(--primary-color)',
      azione: () => clickCalls(null),
    },
    {
      id: 'in-corso',
      label: 'In corso',
      color: 'var(--green-miciomania)',
      azione: () => clickCalls(false),
    },
    {
      id: 'terminati',
      label: 'Terminati',
      color: 'var(--red-miciomania)',
      azione: () => clickCalls(true),
    },
  ];
}

export function getTabsTuoiManga(clickCalls: Function): iTab[] {
  return [
    {
      id: 'preferiti',
      label: '⭐ Preferiti',
      color: 'var(--primary-color)',
      azione: clickCalls('preferiti'),
    },
    {
      id: 'leggendo',
      label: '📖 Leggendo',
      color: 'var(--green-miciomania)',
      azione: clickCalls('letti'),
    },
    {
      id: 'completati',
      label: '✅ Completati',
      color: 'var(--red-miciomania)',
      azione: clickCalls('completati'),
    },
  ];
}

export function getPulsanti(routerFunc: Function): NavBarButton[] {
  return [
    {
      title: 'I tuoi Manga',
      icon: 'bi bi-book me-2',
      action: () => routerFunc('/manga/tuoi-manga'),
      disabled: !DataHttp.user(),
    },
    {
      title: 'Manga Miciomania',
      icon: 'bi bi-emoji-sunglasses me-2',
      action: () => routerFunc('/manga/manga-miciomani'),
      disabled: !DataHttp.user(),
    },
  ];
}
