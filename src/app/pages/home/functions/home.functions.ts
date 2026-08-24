import { Router } from '@angular/router';
import { iCard } from '../../../../library/interfaces/card.interface';
import { ToggleProps } from '../../../../library/interfaces/toggle.interface';
import { User } from '../../../shared/interfaces/users.interface';
import { AuthService } from '../../../shared/services/auth.service';
import { RaggioPage } from '../../../../library/interfaces/pagination.interface';
import { ConfirmService } from '../../../../library/dialogs/confirm/confirm.service';

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
    {
      titolo: 'Classifica',
      urlPic: 'https://i.postimg.cc/Y0w3Z0mW/Giochi-Card.png',
      descrizione:
        'Classifica dei migliori giocatori Miciomani e le loro squadre',
      bottone: 'Visualizza classifica',
      routerLink: 'feature/classifica',
      color: 'var(--primary)',
    },
  ];
}

export function getToggleProps(
  authService: AuthService,
  router: Router,
  confirmService: ConfirmService,
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
          testo: 'Edit Account',
          icona: 'bi bi-box-arrow-right',
          condition: !!currentUser,
          azione: () => router.navigate(['auth/edit-user']),
        },
        {
          testo: 'Esci',
          icona: 'bi bi-box-arrow-right',
          condition: !!currentUser,
          azione: () => {
            const accountsUser: User[] = authService.accountsUser();
            const currentUser: User | null = authService.currentUser();

            confirmService.confirmCustom({
              titolo: 'Logout Account',
              messaggio: `Vuoi davvero uscire da ${currentUser?.id}?`,
              confirmFunc: () => {
                if (accountsUser.length > 1 && currentUser) {
                  authService.accountsUser.update((x: User[]) =>
                    x.filter((y: User) => y.id != currentUser.id),
                  );
                  authService.currentUser.set(authService.accountsUser()[0]);
                } else {
                  authService.accountsUser.set([]);
                  authService.currentUser.set(null);
                }
              },
              notConfirmFunc: () => {},
            });
          },
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

export function defaultHomeArrayPags(): RaggioPage[] {
  return [
    ...[5, 4, 3, 2].map((x: number) => ({
      width: 40 + 344 * x,
      raggio: x,
    })),
    {
      width: 0,
      raggio: 1,
    },
  ];
}
