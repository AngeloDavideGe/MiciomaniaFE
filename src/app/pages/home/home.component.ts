import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import 'bootstrap'; // Importa Bootstrap JS (incluso Popper.js)
import { filter, map, Observable, startWith, take, tap } from 'rxjs';
import { DataHttp } from '../../core/api/http.data';
import { sottoscrizioneUtenti } from '../../shared/handlers/auth.handler';
import { getVoidUser } from '../../shared/handlers/functions/user.function';
import { User, UserParams } from '../../shared/interfaces/users.interface';
import { AuthService } from '../../shared/services/api/auth.service';
import { ConfirmService } from '../../shared/services/template/confirm.service';
import { ElementiUtenteUtilities } from '../../shared/utilities/elementiUtente.utilities';
import { converUserParams, getConfirmParams } from './functions/home.functions';
import { home_imports } from './imports/home.imports';
import { componenteApertoType } from './interfaces/profilo.interface';
import { HomeLang } from './languages/interfaces/home-lang.interface';
import { Lingua } from '../../shared/interfaces/http.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: home_imports,
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public authService = inject(AuthService);
  private confirmService = inject(ConfirmService);
  public router = inject(Router);

  public user: User = {} as User;
  public inizialiUser: string = '';
  private punteggioCanzoni: number = 50;
  public componenteAperto = signal<componenteApertoType>('');
  private elementiUtenteUtilities = new ElementiUtenteUtilities();
  public homeLang = signal<HomeLang>({} as HomeLang);

  public isHome$: Observable<boolean> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    startWith({ url: this.router.url }),
    map((event) => event.url == '/home'),
    tap(() => this.loadUsers())
  );

  constructor() {
    effect(() => {
      const user: User | null = DataHttp.user();
      this.handleUserSubscription(user);
    });

    effect(() => {
      const lingua: Lingua = DataHttp.lingua();
      const languageMap: Record<Lingua, () => Promise<any>> = {
        it: () => import('./languages/constants/home-it.constant'),
        en: () => import('./languages/constants/home-en.constant'),
      };
      languageMap[lingua]().then((m) => this.homeLang.set(m.homeLang));
    });
  }

  ngOnInit(): void {
    const user: User | null = DataHttp.user();
    if (user && user.id) {
      this.loadElementiUtente(user.id);
    }
  }

  private loadUsers(): void {
    this.componenteAperto.set('');
    if (DataHttp.users().length === 0) {
      sottoscrizioneUtenti({
        authService: this.authService,
        nextCall: (data) => this.handleUsersSubscription(data),
      });
    }
  }

  private loadElementiUtente(idUtente: string): void {
    this.elementiUtenteUtilities
      .getElementiUtente(idUtente, false)
      .pipe(take(1))
      .subscribe();
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
    DataHttp.users.update((users) => [...users, converUserParams(this.user)]);
    DataHttp.user.set(null);
    DataHttp.profiloPersonale = null;
    DataHttp.mangaUtente = {} as any;
    DataHttp.elementiUtente = {} as any;
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

    DataHttp.users.set(otherUsers);
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
