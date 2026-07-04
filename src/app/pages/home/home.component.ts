import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmService } from '../../../library/dialogs/confirm.service';
import { handlerFunc } from '../../../library/functions/handler.function';
import { isCurrentRoute } from '../../../library/functions/router.function';
import { iCard } from '../../../library/interfaces/card.interface';
import { RaggioPage } from '../../../library/interfaces/pagination.interface';
import {
  ToggleProps,
  ToggleStyles,
} from '../../../library/interfaces/toggle.interface';
import { AppConfigService } from '../../core/api/appConfig.service';
import { DataHttp } from '../../core/api/http.data';
import { UserReduced } from '../../core/components/chat/interfaces/chat.interface';
import { setUserDataNull } from '../../core/functions/storage.function';
import { mapUserMessage } from '../../shared/functions/user-map.function';
import { getVoidUser } from '../../shared/handlers/auth.handler';
import {
  CronUtenti,
  User,
  UserParams,
} from '../../shared/interfaces/users.interface';
import { AuthService } from '../../shared/services/api/auth.service';
import { ElementiUtenteService } from '../../shared/services/api/elementiUtente.service';
import {
  CompAperto,
  compApertoFunc,
  recordComp,
  RecordNotifiche,
} from './enums/home.enum';
import {
  getCardsHome,
  getConfirmParams,
  getNotificheTemplate,
  getProfiliTemplate,
  getToggleMenus,
  getToggleNotifiche,
  pagineHome,
} from './functions/home.functions';
import { home_imports } from './home.imports';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: home_imports,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public authService = inject(AuthService);
  private elementiUtenteService = inject(ElementiUtenteService);
  private configService = inject(AppConfigService);
  private confirmService = inject(ConfirmService);
  public router = inject(Router);

  public readonly imgDefault: string =
    this.configService.config.defaultPicsUrl.user;
  public user: User = {} as User;
  public inizialiUser: string = '';
  public compAperto: recordComp = {} as recordComp;
  public notificheStyle: ToggleStyles = { width: '25rem' };
  public profiliStyle: ToggleStyles = { width: '20rem', left: 0 };

  public allProfili = computed<User[]>(() => {
    this.authService.users();
    return DataHttp.allUsers;
  });

  public userMessageMap = computed<Record<string, UserReduced> | null>(() => {
    let userRecord: Record<string, UserReduced> | null = null;

    if (this.authService.users().length > 0) {
      userRecord = mapUserMessage(this.authService, this.configService);
      userRecord[this.user.id] = {
        nome: this.user.credenziali.nome,
        pic: this.user.credenziali.profilePic || this.imgDefault,
      };
    }

    return userRecord;
  });

  public cardsHome = computed<iCard[]>(() =>
    getCardsHome(this.router, () => this.controlloPunteggio()),
  );

  public toggleProfili = computed<ToggleProps[]>(() => {
    const allProfili: User[] = this.allProfili();
    DataHttp.user();

    if (allProfili.length > 0) {
      return getToggleNotifiche(
        allProfili.map((value: User) => {
          return {
            azione: () => {
              if (value.id != this.user.id) {
                setUserDataNull(
                  value,
                  this.authService,
                  'change-user',
                  this.elementiUtenteService,
                );
              }
            },
            testo: getProfiliTemplate(value, this.user.id),
            condition: true,
          };
        }),
      );
    } else {
      return getToggleNotifiche([
        {
          azione: () => {},
          testo: `
          <div 
            class="elemento-centrato"
            style="padding-top: 2rem"
          >
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        `,
          condition: true,
        },
      ]);
    }
  });

  public toggleNotifiche = computed<ToggleProps[]>(() => {
    if (this.userMessageMap() && this.authService.notifiche().length > 0) {
      return getToggleNotifiche(
        this.authService.notifiche().map((value: CronUtenti) => {
          return {
            azione: () => {
              if (value.sezione == 'Profilo') {
                this.router.navigate([
                  RecordNotifiche[value.sezione] + '/' + value.idUtente,
                ]);
              } else {
                this.router.navigate([RecordNotifiche[value.sezione]]);
              }
            },
            testo: getNotificheTemplate(
              value,
              this.userMessageMap()!,
              this.imgDefault,
            ),
            condition: true,
          };
        }),
      );
    } else {
      return getToggleNotifiche([
        {
          azione: () => {},
          testo: `
          <div 
            class="elemento-centrato"
            style="padding-top: 2rem"
          >
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        `,
          condition: true,
        },
      ]);
    }
  });

  public toggleMenus = computed<ToggleProps[]>(() =>
    getToggleMenus(
      this.router,
      DataHttp.user()?.id,
      () => this.logout(),
      () =>
        this.switchCompAperto(CompAperto.cursore, !this.compAperto.cursore()),
    ),
  );

  public readonly enumCompAperto = CompAperto;
  private readonly punteggioCanzoni: number = 20;
  public readonly pagineHome: RaggioPage[] = pagineHome();

  public isHome$: Observable<boolean> = isCurrentRoute({
    router: this.router,
    eventName: '/home',
    tapFunc: (isCurrent: boolean) => (isCurrent ? this.loadUsers() : null),
  });

  constructor() {
    compApertoFunc((key: CompAperto) => {
      this.compAperto[key] = signal<boolean>(false);
    });

    effect(() => {
      const user: User | null = DataHttp.user();
      this.handleUserSubscription(user);
    });
  }

  private loadUsers(): void {
    this.compAperto.cursore.set(false);

    handlerFunc<UserParams[]>({
      skipCall: this.authService.users().length > 0,
      callHttp: () => this.authService.getAllUsersHttp(),
      nextCall: (data: UserParams[]) => this.handleUsersSubscription(data),
    });

    handlerFunc<CronUtenti[]>({
      skipCall: this.authService.notificheCaricate,
      callHttp: () => this.authService.getNotifiche(),
      nextCall: (data: CronUtenti[]) => this.authService.notifiche.set(data),
      errorCall: () => (this.authService.notificheCaricate = false),
    });

    this.authService.notificheCaricate = true;
  }

  logout(): void {
    this.confirmService.confirmCustom({
      titolo: 'Logout',
      messaggio: 'Vuoi davvero effettuare il logout?',
      buttonNo: 'Annulla',
      buttonSi: 'Conferma',
      notConfirmFunc: () => {},
      confirmFunc: () => {
        setUserDataNull(
          this.user,
          this.authService,
          'logout',
          this.elementiUtenteService,
        );
        this.setAnonymousUser();
      },
    });
  }

  public logoutAll(): void {
    setUserDataNull(
      {} as User,
      this.authService,
      'logout-all',
      this.elementiUtenteService,
    );
    this.compAperto.profili.set(false);
  }

  private handleUserSubscription(user: User | null): void {
    if (user) {
      this.user = user;
      this.inizialiUser = this.user.id.slice(0, 2).toUpperCase();
    } else {
      this.setAnonymousUser();
    }
  }

  private setAnonymousUser(): void {
    this.user = getVoidUser();
    this.user.credenziali.nome = 'Anonimo';
    this.inizialiUser = 'AN';
  }

  private handleUsersSubscription(data: UserParams[]): void {
    const otherUsers: UserParams[] = [];

    for (const user of data) {
      if (user.id === this.user.id) {
        this.user.id = user.id;
        this.user.credenziali.nome = user.nome;
        this.user.credenziali.profilePic = user.profilePic;
      } else {
        otherUsers.push(user);
      }
    }

    this.authService.users.set(otherUsers);
  }

  public controlloPunteggio(): void {
    if (this.punteggioCanzoni < this.user.iscrizione.punteggio!) {
      this.router.navigate(['/canzoni']);
    } else {
      const { path, titolo, messaggio } = getConfirmParams(this.user);
      this.confirmService.confirmCustom({
        titolo: titolo,
        messaggio: messaggio,
        confirmFunc: () => this.router.navigate([path]),
        notConfirmFunc: () => {},
      });
    }
  }

  public switchCompAperto(compAperto: CompAperto, aperto: boolean): void {
    compApertoFunc((key: CompAperto) => {
      this.compAperto[key].set(key === compAperto && aperto);
    });
  }
}
