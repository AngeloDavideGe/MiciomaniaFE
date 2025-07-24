import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import 'bootstrap'; // Importa Bootstrap JS (incluso Popper.js)
import { filter, map, Observable, startWith, take, tap } from 'rxjs';
import { AuthHandler } from '../../shared/handlers/auth.handler';
import { User, UserParams } from '../../shared/interfaces/users.interface';
import { ElementiUtenteUtilities } from '../../shared/utilities/elementiUtente.utilities';
import { getConfirmParams } from './functions/home.functions';
import { home_imports } from './imports/home.imports';
import { componenteApertoType } from './interfaces/profilo.interface';
import { MangaHandler } from '../manga/handlers/manga.handler';
import { ProfiloHandler } from './handlers/profilo.handler';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: home_imports,
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public authHandler = inject(AuthHandler);
  public profiloHandler = inject(ProfiloHandler);
  private mangaHandler = inject(MangaHandler);

  public router = inject(Router);

  public user: User = {} as User;
  public inizialiUser: string = '';
  private punteggioCanzoni: number = 50;
  public componenteAperto = signal<componenteApertoType>('');
  public chiudiComponente: Function = () => this.componenteAperto.set('');
  public goToProfilo: Function = (path: string) => this.router.navigate([path]);
  private elementiUtenteUtilities = new ElementiUtenteUtilities();

  public isHome$: Observable<boolean> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    startWith({ url: this.router.url }),
    map((event) => event.url == '/home'),
    tap(() => {
      this.componenteAperto.set('');
      this.loadUsers();
    })
  );

  constructor() {
    effect(() => {
      const user: User | null = this.authHandler.user();
      this.handleUserSubscription(user);
    });
  }

  ngOnInit(): void {
    const user: User | null = this.authHandler.user();
    if (user && user.id) {
      this.loadElementiUtente(user.id);
    }
  }

  private loadUsers(): void {
    if (this.authHandler.users().length === 0) {
      this.authHandler.sottoscrizioneUtenti({
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
    this.authHandler.confirmCustom({
      titolo: 'Logout',
      messaggio: 'Vuoi davvero effettuare il logout?',
      buttonNo: 'Annulla',
      buttonSi: 'Conferma',
      confirmFunc: () => this.confirmLogout(),
    });
  }

  private confirmLogout(): void {
    this.usersLogout();
    this.mangaHandler.mangaUtente = {} as any;
    this.profiloHandler.profiloPersonale = null;
    this.authHandler.user.set(null);
    this.setAnonymousUser();
  }

  private usersLogout(): void {
    this.authHandler.users.update((users) => [
      ...users,
      this.authHandler.converUserParams(this.user),
    ]);
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
    this.user = this.authHandler.getVoidUser();
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

    this.authHandler.users.set(otherUsers);
  }

  public controlloPunteggio(): void {
    if (this.punteggioCanzoni < this.user.iscrizione.punteggio!) {
      this.router.navigate(['/canzoni']);
    } else {
      const { path, titolo, messaggio } = getConfirmParams(this.user);
      this.authHandler.confirmCustom({
        titolo: titolo,
        messaggio: messaggio,
        confirmFunc: () => this.router.navigate([path]),
      });
    }
  }
}
