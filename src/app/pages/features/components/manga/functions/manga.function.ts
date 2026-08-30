import {
  iTab,
  ISidebarItem,
} from '../../../../../../library/interfaces/navbar.interface';
import { RaggioPage } from '../../../../../../library/interfaces/pagination.interface';
import { OpereToolbar } from '../../../../../shared/interfaces/opere.interface';
import { ILang } from '../../../../../core/interfaces/lang.interface';

export function getMangaTabs(lang: ILang['Manga']['Tabs']): iTab[] {
  return [
    {
      id: 'tutti',
      label: lang.Tutti,
      color: 'var(--primary-light)',
    },
    {
      id: 'in_corso',
      label: lang.InCorso,
      color: 'var(--primary-light)',
    },
    {
      id: 'completati',
      label: lang.Completati,
      color: 'var(--primary-light)',
    },
  ];
}

export function getMangaSidebar(
  lang: ILang['Manga']['Categorie'],
): ISidebarItem[] {
  return [
    {
      id: 'ufficiali',
      nome: lang.Ufficiali,
      icona: 'bi-grid',
    },
    {
      id: 'miciomania',
      nome: lang.Miciomania,
      icona: 'bi-play-circle',
    },
  ];
}

export function getMangaSidebarSub(
  lang: ILang['Manga']['Sottocategorie'],
): ISidebarItem[] {
  return [
    {
      id: 'tutti',
      nome: lang.Tutti,
      icona: 'bi-grid',
    },
    {
      id: 'preferiti',
      nome: lang.Preferiti,
      icona: 'bi-heart',
    },
  ];
}

export function getMangaToolbar(
  manga: number,
  capitoli: number,
  lang: ILang['Manga']['Toolbar'],
): OpereToolbar[] {
  return [
    {
      icon: 'bi-book',
      value: manga,
      title: lang.MangaDisponibili,
    },
    {
      icon: 'bi-grid',
      value: capitoli,
      title: lang.CapitoliTotali,
    },
  ];
}

export function defaultMangaArrayPags(): RaggioPage[] {
  return [
    {
      width: 1904,
      raggio: 5,
    },
    {
      width: 1591.2,
      raggio: 4,
    },
    {
      width: 1279.2,
      raggio: 3,
    },
    {
      width: 986.4,
      raggio: 2,
    },
    {
      width: 0,
      raggio: 1,
    },
  ];
}
