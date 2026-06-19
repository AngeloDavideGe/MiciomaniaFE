import { iTab } from '../../../../library/components/tabs/tabs.component';
import { NavBarButton } from '../../../../library/interfaces/navbar.interface';
import { DataHttp } from '../../../core/api/http.data';
import { TuoiMangaLang } from '../components/pages/tuoi-manga/languages/interfaces/tuoiManga-lang.interface';

export function getTabsManga(clickCalls: Function): iTab[] {
  return [
    {
      id: 'tutti',
      label: 'Tutti',
      color: '#6c5ce7',
      azione: () => clickCalls(null),
    },
    {
      id: 'in-corso',
      label: 'In corso',
      color: '#00b894',
      azione: () => clickCalls(false),
    },
    {
      id: 'terminati',
      label: 'Terminati',
      color: '#e84393',
      azione: () => clickCalls(true),
    },
  ];
}

export function getTabsTuoiManga(
  clickCalls: Function,
  lang: TuoiMangaLang,
): iTab[] {
  return [
    {
      id: 'preferiti',
      label: '⭐ ' + lang.preferiti,
      color: '#6c5ce7',
      azione: clickCalls('preferiti'),
    },
    {
      id: 'leggendo',
      label: '📖 ' + lang.leggendo,
      color: '#00b894',
      azione: clickCalls('letti'),
    },
    {
      id: 'completati',
      label: '✅ ' + lang.completati,
      color: '#e84393',
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
