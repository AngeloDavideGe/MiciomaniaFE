import { Router } from '@angular/router';
import { ConfirmService } from '../../../../library/dialogs/confirm/confirm.service';
import { iCard } from '../../../../library/interfaces/card.interface';
import { RaggioPage } from '../../../../library/interfaces/pagination.interface';
import { ToggleProps } from '../../../../library/interfaces/toggle.interface';
import {
  AppConfigService,
  LangEnum,
} from '../../../core/api/appConfig.service';
import { ILang } from '../../../core/interfaces/lang.interface';
import { User } from '../../../shared/interfaces/users.interface';
import { AuthService } from '../../../shared/services/auth.service';

export function getCategorieCard(lang: ILang['Home']): iCard[] {
  return [
    {
      titolo: lang.Card1.titolo,
      descrizione: lang.Card1.descrizione,
      bottone: lang.Card1.bottone,
      urlPic: 'https://i.postimg.cc/N0MRzTJn/Manga-Card.png',
      routerLink: 'feature/manga',
      color: 'var(--primary)',
    },
    {
      titolo: lang.Card2.titolo,
      descrizione: lang.Card2.descrizione,
      bottone: lang.Card2.bottone,
      urlPic: 'https://i.postimg.cc/6QkTfGD4/Canzoni-Card.png',
      routerLink: 'feature/canzoni',
      color: 'var(--primary)',
    },
    {
      titolo: lang.Card3.titolo,
      descrizione: lang.Card3.descrizione,
      bottone: lang.Card3.bottone,
      urlPic: 'https://i.postimg.cc/Y0w3Z0mW/Giochi-Card.png',
      routerLink: 'feature/giochi',
      color: 'var(--primary)',
    },
    {
      titolo: lang.Card4.titolo,
      descrizione: lang.Card4.descrizione,
      bottone: lang.Card4.bottone,
      urlPic: 'https://i.postimg.cc/Y0w3Z0mW/Giochi-Card.png',
      routerLink: 'feature/classifica',
      color: 'var(--primary)',
    },
  ];
}

export function getToggleProps(
  authService: AuthService,
  router: Router,
  confirmService: ConfirmService,
  appConfig: AppConfigService,
  lang: ILang['Home']['Toggle'],
): ToggleProps[] {
  const currentUser: User | null = authService.currentUser();

  return [
    {
      titolo: lang.Account,
      icona: 'bi bi-person-circle',
      menuElementi: [
        {
          testo: lang.Profilo,
          icona: 'bi bi-person-vcard',
          condition: !!authService.currentUser(),
          azione: () =>
            router.navigate(['auth/user/' + authService.currentUser()?.id]),
        },
      ],
    },
    {
      titolo: lang.Lingua,
      icona: 'bi bi-globe2',
      menuElementi: Object.values(LangEnum).map((x: LangEnum) => {
        return {
          testo: x.toUpperCase(),
          icona:
            x === appConfig.currentLang()
              ? 'bi bi-check-circle-fill text-success'
              : 'bi bi-translate',
          condition: true,
          azione: () => appConfig.changeLang(x),
        };
      }),
    },
    {
      titolo: lang.Auth,
      icona: 'bi bi-shield-lock',
      menuElementi: [
        {
          testo: lang.Esci,
          icona: 'bi bi-box-arrow-right',
          condition: !!currentUser,
          azione: () => {
            const accountsUser: User[] = authService.accountsUser();
            const currentUser: User | null = authService.currentUser();

            confirmService.confirmCustom({
              titolo: lang.LogoutTitolo,
              messaggio: `${lang.LogoutMessaggio} ${currentUser?.id}?`,
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
          testo: lang.Login,
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
