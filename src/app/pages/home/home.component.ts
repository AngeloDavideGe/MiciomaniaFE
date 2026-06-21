import { Component, computed, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, startWith, tap } from 'rxjs';
import { ConfirmService } from '../../../library/dialogs/confirm.service';
import { handlerFunc } from '../../../library/functions/handler.function';
import { iCard } from '../../../library/interfaces/card.interface';
import { RaggioPage } from '../../../library/interfaces/pagination.interface';
import { ToggleProps } from '../../../library/interfaces/toggle.interface';
import { DataHttp } from '../../core/api/http.data';
import { setUserDataNull } from '../../core/functions/storage.function';
import { getVoidUser } from '../../shared/handlers/auth.handler';
import { User, UserParams } from '../../shared/interfaces/users.interface';
import { AuthService } from '../../shared/services/api/auth.service';
import { ElementiUtenteService } from '../../shared/services/api/elementiUtente.service';
import { CompAperto, compApertoFunc, recordComp } from './enums/home.enum';
import {
  getCardsHome,
  getConfirmParams,
  pagineHome,
} from './functions/home.functions';
import { getToggleMenus } from './functions/menu.function';
import { home_imports } from './home.imports';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: home_imports,
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public authService = inject(AuthService);
  private elementiUtenteService = inject(ElementiUtenteService);
  private confirmService = inject(ConfirmService);
  public router = inject(Router);

  public user: User = {} as User;
  public inizialiUser: string = '';
  public compAperto: recordComp = {} as recordComp;

  public cardsHome = computed<iCard[]>(() =>
    getCardsHome(this.router, () => this.controlloPunteggio()),
  );

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

  public isHome$: Observable<boolean> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    startWith({ url: this.router.url }),
    map((event) => event.url == '/home'),
    tap(() => this.loadUsers()),
  );

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
