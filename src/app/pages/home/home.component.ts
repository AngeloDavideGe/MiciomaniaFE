import { Component, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import 'bootstrap'; // Importa Bootstrap JS (incluso Popper.js)
import { filter, map, Observable, startWith, tap } from 'rxjs';
import { DataHttp } from '../../core/api/http.data';
import { sottoscrizioneUtenti } from '../../shared/handlers/auth.handler';
import { getVoidUser } from '../../shared/handlers/functions/user.function';
import { Lingua } from '../../shared/interfaces/http.interface';
import { User, UserParams } from '../../shared/interfaces/users.interface';
import { AuthService } from '../../shared/services/api/auth.service';
import { ConfirmService } from '../../shared/services/template/confirm.service';
import { converUserParams, getConfirmParams } from './functions/home.functions';
import { home_imports } from './imports/home.imports';
import {
  HomeLang,
  HomeLangType,
} from './languages/interfaces/home-lang.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: home_imports,
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public authService = inject(AuthService);
  private confirmService = inject(ConfirmService);
  public router = inject(Router);

  public user: User = {} as User;
  public inizialiUser: string = '';
  public cursoreAperto = signal<boolean>(false);
  public homeLang = signal<HomeLang>({} as HomeLang);
  private readonly punteggioCanzoni: number = 20;

  public isHome$: Observable<boolean> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    startWith({ url: this.router.url }),
    map((event) => event.url == '/home'),
    tap(() => this.loadUsers()),
  );

  constructor() {
    effect(() => {
      const user: User | null = DataHttp.user();
      this.handleUserSubscription(user);
    });

    effect(() => {
      const lingua: Lingua = DataHttp.lingua();
      const languageMap: Record<Lingua, () => Promise<HomeLangType>> = {
        it: () => import('./languages/constants/home-it.constant'),
        en: () => import('./languages/constants/home-en.constant'),
      };
      languageMap[lingua]().then((m) => this.homeLang.set(m.homeLang));
    });
  }

  private loadUsers(): void {
    this.cursoreAperto.set(false);
    sottoscrizioneUtenti({
      authService: this.authService,
      elseCall: () => {},
      nextCall: (data) => this.handleUsersSubscription(data),
    });
  }

  logout(): void {
    this.confirmService.confirmCustom({
      titolo: 'Logout',
      messaggio: 'Vuoi davvero effettuare il logout?',
      buttonNo: 'Annulla',
      buttonSi: 'Conferma',
      confirmFunc: () => this.confirmLogout(),
      notConfirmFunc: () => {},
    });
  }

  private confirmLogout(): void {
    this.authService.users.update((users) => [
      ...users,
      converUserParams(this.user),
    ]);
    DataHttp.user.set(null);
    DataHttp.profiloPersonale = null;
    DataHttp.mangaUtente = {} as any;
    this.setAnonymousUser();
  }

  private handleUserSubscription(user: User | null): void {
    if (user) {
      this.user = user;
      this.inizialiUser = this.calculateUserInitials(user.credenziali.nome);
    } else {
      this.setAnonymousUser();
    }
  }

  private calculateUserInitials(nome: string): string {
    const nomi: string[] = nome.split(' ');
    if (nomi.length > 1) {
      return nomi[0][0] + nomi[1][0];
    }
    return nome.slice(0, 2);
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
}
