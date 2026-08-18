import { Router } from '@angular/router';
import { iCard } from '../../../../library/interfaces/card.interface';
import { ToggleProps } from '../../../../library/interfaces/toggle.interface';
import { User } from '../../../shared/interfaces/users.interface';
import { AuthService } from '../../../shared/services/auth.service';

export function getCategorieCard(): iCard[] {
  return [
    {
      titolo: 'Manga',
      urlPic: 'https://i.postimg.cc/N0MRzTJn/Manga-Card.png',
      descrizione:
        'Scopri la mia collezione di manga, recensioni, letture in corso e consigli.',
      bottone: 'Esplora manga',
      routerLink: 'feature/manga',
      color: 'var(--primary)',
    },
    {
      titolo: 'Musica',
      urlPic: 'https://i.postimg.cc/6QkTfGD4/Canzoni-Card.png',
      descrizione: 'Ascolta playlist, album preferiti e scopri nuovi artisti.',
      bottone: 'Vai alla musica',
      routerLink: 'feature/canzoni',
      color: 'var(--primary)',
    },
    {
      titolo: 'Giochi',
      urlPic: 'https://i.postimg.cc/Y0w3Z0mW/Giochi-Card.png',
      descrizione:
        'Tutto il mondo gaming: giochi provati, consigli e preferiti.',
      bottone: 'Scopri giochi',
      routerLink: 'feature/giochi',
      color: 'var(--primary)',
    },
  ];
}

export function getToggleProps(
  authService: AuthService,
  router: Router,
): ToggleProps[] {
  const currentUser: User | null = authService.currentUser();

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
      ],
    },
    {
      titolo: 'Auth',
      icona: 'bi bi-three-dots',
      menuElementi: [
        {
          testo: 'Esci',
          icona: 'bi bi-box-arrow-right',
          condition: !!currentUser,
          azione: () => authService.currentUser.set(null),
        },
        {
          testo: 'Login',
          icona: 'bi bi-box-arrow-right',
          condition: !currentUser,
          azione: () => router.navigate(['auth/login']),
        },
      ],
    },
  ];
}
