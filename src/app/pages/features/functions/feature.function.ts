import { Router } from '@angular/router';
import { PulsanteNavbar } from '../../../../library/interfaces/navbar.interface';

export function getFeatureNavbar(router: Router): PulsanteNavbar[] {
  return [
    {
      id: 'home',
      icon: 'bi-house',
      text: 'Home',
      azione: () => router.navigate(['home']),
    },
  ];
}

export function getBottomNavItems(router: Router): PulsanteNavbar[] {
  return [
    {
      id: 'manga',
      icon: 'bi-book',
      text: 'Manga',
      azione: () => router.navigate(['feature/manga']),
    },
    {
      id: 'canzoni',
      icon: 'bi-music-note',
      text: 'Canzoni',
      azione: () => router.navigate(['feature/canzoni']),
    },
    {
      id: 'giochi',
      icon: 'bi-joystick',
      text: 'Giochi',
      azione: () => router.navigate(['feature/giochi']),
    },
    {
      id: 'post',
      icon: 'bi-chat',
      text: 'Post',
      azione: () => router.navigate(['feature/post']),
    },
    {
      id: 'classifica',
      icon: 'bi-trophy',
      text: 'Classifica',
      azione: () => router.navigate(['feature/classifica']),
    },
  ];
}
