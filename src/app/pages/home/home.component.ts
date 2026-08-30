import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { handlerFunc } from '../../../library/functions/handler.function';
import { isCurrentRoute } from '../../../library/functions/router.function';
import { ToggleProps } from '../../../library/interfaces/toggle.interface';
import { AppConfigService } from '../../core/api/appConfig.service';
import {
  CronUtenti,
  User,
  UserParams,
} from '../../shared/interfaces/users.interface';
import { AuthService } from '../../shared/services/auth.service';
import { OpereService } from '../../shared/services/opere.service';
import {
  defaultHomeArrayPags,
  getCategorieCard,
  getToggleProps,
} from './functions/home.functions';
import { home_imports } from './home.imports';
import {
  ACCOUNTS_USER_KEY,
  CURRENT_USER_KEY,
} from '../../core/functions/storage.function';
import { ConfirmService } from '../../../library/dialogs/confirm/confirm.service';
import { iCard } from '../../../library/interfaces/card.interface';
import { ILang } from '../../core/interfaces/lang.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: home_imports,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public router = inject(Router);
  public authService = inject(AuthService);
  private appConfig = inject(AppConfigService);
  private opereService = inject(OpereService);
  private confirmService = inject(ConfirmService);

  private openNow: boolean = true;

  public lang = computed<ILang['Home']>(() => {
    this.appConfig.currentLang();
    return this.appConfig.lang.Home;
  });

  public readonly pic = this.appConfig.config.defaultPicsUrl.user;
  public readonly maxUsers = this.appConfig.config.maxElement.users;
  public readonly arrayRaggi = defaultHomeArrayPags();

  public cardsHome = computed<iCard[]>(() => getCategorieCard(this.lang()));

  public impostazioniToggle = computed<ToggleProps[]>(() =>
    getToggleProps(
      this.authService,
      this.router,
      this.confirmService,
      this.appConfig,
      this.lang().Toggle,
    ),
  );

  public imgToggle = computed<string>(() => {
    const user: User | null = this.authService.currentUser();

    if (!user || !user.credenziali || !user.credenziali.profilePic) {
      return this.pic;
    } else {
      return user.credenziali.profilePic;
    }
  });

  public accountToggle = computed<ToggleProps[]>(() => {
    const user: User | null = this.authService.currentUser();
    const accounts: User[] = this.authService.accountsUser();

    return [
      {
        titolo: this.lang().AccountMenuTitolo,
        menuElementi: accounts.map((account: User) => ({
          testo: account.credenziali.nome,
          sottotitolo: account.id,
          selezionato: account.id === user?.id,
          image: account?.credenziali?.profilePic || this.pic,
          condition: true,
          azione: () => {
            this.authService.currentUser.set(account);
            this.menuOpen.set('');
          },
        })),
      },
    ];
  });

  public menuOpen = signal<string>('');

  public isHome$: Observable<boolean> = isCurrentRoute({
    router: this.router,
    eventName: '/home',
    tapFunc: (isCurrent: boolean) => {
      if (isCurrent) {
        this.loadAllUsers();
        this.loadNotifiche();
      }
    },
  });

  public userPic = computed<Record<string, UserReduced> | null>(() => {
    const users: UserParams[] = this.authService.users();

    if (users.length == 0) {
      return null;
    }

    return users.reduce(
      (record, utente) => {
        record[utente.id] = {
          nome: utente.nome,
          pic: utente.profilePic || this.pic,
        };

        return record;
      },
      {} as Record<string, UserReduced>,
    );
  });

  public notificheToggle = computed<ToggleProps[]>(() => {
    const notifiche: CronUtenti[] = this.authService.notifiche();
    const usersPic: Record<string, UserReduced> | null = this.userPic();

    if (notifiche.length == 0 || !usersPic) {
      return [];
    }

    const toggle: ToggleProps = {
      titolo: '',
      menuElementi: notifiche.map((x: CronUtenti) => ({
        azione: () => {},
        testo: x.idUtente + x.azione,
        condition: true,
        image: usersPic[x.idUtente]?.pic || this.pic,
      })),
    };

    return [toggle];
  });

  constructor() {
    effect(() => {
      const user: User | null = this.authService.currentUser();

      if (this.openNow) {
        this.openNow = false;
      } else {
        this.opereService.canzoni.set([]);
        this.opereService.manga.set(null);
        this.opereService.mangaUtente.set(null);

        this.opereService.mangaLoaded = false;
        this.opereService.canzoniLoaded = false;
      }
    });
  }

  public logoutAllAccounts(): void {
    this.confirmService.confirmCustom({
      titolo: this.lang().LogoutAllTitolo,
      messaggio: this.lang().LogoutAllMessaggio,
      confirmFunc: () => {
        this.authService.currentUser.set(null);
        this.authService.accountsUser.set([]);
        this.authService.token.set(null);
        localStorage.removeItem(CURRENT_USER_KEY);
        localStorage.removeItem(ACCOUNTS_USER_KEY);
        this.menuOpen.set('');
      },
      notConfirmFunc: () => {},
    });
  }

  private loadAllUsers(): void {
    handlerFunc<UserParams[]>({
      skipCall: this.authService.usersCaricati,
      callHttp: () => this.authService.getAllUsersHttp(),
      nextCall: (data: UserParams[]) => this.authService.users.set(data),
      errorCall: () => (this.authService.usersCaricati = false),
    });

    this.authService.usersCaricati = true;
  }

  private loadNotifiche(): void {
    handlerFunc<CronUtenti[]>({
      skipCall: this.authService.notificheCaricate,
      callHttp: () => this.authService.getNotifiche(),
      nextCall: (data: CronUtenti[]) => this.authService.notifiche.set(data),
      errorCall: () => (this.authService.notificheCaricate = false),
    });

    this.authService.notificheCaricate = true;
  }
}

interface UserReduced {
  nome: string;
  pic: string;
}
