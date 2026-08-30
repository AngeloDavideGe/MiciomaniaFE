import { Router } from '@angular/router';
import { PulsanteNavbar } from '../../../../library/interfaces/navbar.interface';
import { ILang } from '../../../core/interfaces/lang.interface';

export function getFeatureNavbar(
  router: Router,
  lang: ILang['Feature']['Navbar'],
): PulsanteNavbar[] {
  return [
    {
      id: 'home',
      icon: 'bi-house',
      text: lang.Home,
      azione: () => router.navigate(['home']),
    },
  ];
}

export function getBottomNavItems(
  router: Router,
  lang: ILang['Feature']['Navbar'],
): PulsanteNavbar[] {
  return [
    {
      id: 'manga',
      icon: 'bi-book',
      text: lang.Manga,
      azione: () => router.navigate(['feature/manga']),
    },
    {
      id: 'canzoni',
      icon: 'bi-music-note',
      text: lang.Canzoni,
      azione: () => router.navigate(['feature/canzoni']),
    },
    {
      id: 'giochi',
      icon: 'bi-joystick',
      text: lang.Giochi,
      azione: () => router.navigate(['feature/giochi']),
    },
    {
      id: 'post',
      icon: 'bi-chat',
      text: lang.Post,
      azione: () => router.navigate(['feature/post']),
    },
    {
      id: 'classifica',
      icon: 'bi-trophy',
      text: lang.Classifica,
      azione: () => router.navigate(['feature/classifica']),
    },
  ];
}
