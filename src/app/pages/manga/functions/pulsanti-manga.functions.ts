import { DataHttp } from '../../../core/api/http.data';
import { NavBarButton } from '../../../shared/components/custom/navbar-custom.component';
import { TabsManga } from '../interfaces/filtri.interface';
import { MangaLang } from '../languages/interfaces/manga-lang.interface';

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

export function getPulsanti(
  routerFunc: Function,
  mangaLang: MangaLang,
): NavBarButton[] {
  return [
    {
      title: mangaLang.tuoiMAnga,
      icon: 'bi bi-book me-2',
      action: () => routerFunc('/manga/tuoi-manga'),
      disabled: !DataHttp.user(),
    },
    {
      title: mangaLang.mangaMiciomania,
      icon: 'bi bi-emoji-sunglasses me-2',
      action: () => routerFunc('/manga/manga-miciomani'),
      disabled: !DataHttp.user(),
    },
  ];
}
