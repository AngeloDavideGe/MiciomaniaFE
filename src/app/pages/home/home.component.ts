import {
  Component,
  effect,
  Injector,
  OnDestroy,
  OnInit,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { NavigationEnd } from '@angular/router';
import 'bootstrap'; // Importa Bootstrap JS (incluso Popper.js)
import { distinctUntilChanged, filter, Subject, take, takeUntil } from 'rxjs';
import { AuthCustom } from '../../shared/custom/auth-custom.class';
import { User, UserParams } from '../../shared/interfaces/users.interface';
import { ElementiUtenteUtilities } from '../../shared/utilities/elementiUtente-utilities.class';
import { getConfirmParams } from './functions/home.functions';
import { home_imports } from './imports/home.imports';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: home_imports,
  templateUrl: './home.component.html',
})
export class HomeComponent extends AuthCustom implements OnInit, OnDestroy {
  public isHome = signal<boolean>(false);
  public user: User = {} as User;
  public inizialiUser: string = '';
  private punteggioCanzoni: number = 50;
  public componenteAperto = signal<string>('');
  private destroy$ = new Subject<void>();
  public chiudiComponente: Function = () => this.componenteAperto.set('');
  public goToProfilo: Function = (path: string) => this.router.navigate([path]);
  private elementiUtenteUtilities = new ElementiUtenteUtilities();

  constructor(private injector: Injector) {
    super();
    if (this.router.url === '/home') {
      effect(() => {
        const user: User | null = this.authService.user();
        this.handleUserSubscription(user);
      });
    }
    this.routerEvents();
  }

  ngOnInit(): void {
    if (this.router.url === '/home') {
      this.isHome.set(true);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout(): void {
    this.confirmCustom({
      titolo: 'Logout',
      messaggio: 'Vuoi davvero effettuare il logout?',
      buttonNo: 'Annulla',
      buttonSi: 'Conferma',
      confirmFunc: () => this.confirmLogout(),
    });
  }

  private confirmLogout(): void {
    this.usersLogout();
    this.profiloHandler.profiloPersonale = null;
    this.authService.logout();
    this.setAnonymousUser();
  }

  private usersLogout(): void {
    let allUser: UserParams[] = structuredClone(this.authService.getUsers);
    allUser.push(this.converUserParams(this.user));
    this.authService.setUsers = allUser;
    sessionStorage.setItem('users', JSON.stringify(allUser));
  }

  private routerEvents(): void {
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        distinctUntilChanged((a, b) => a.url === b.url)
      )
      .subscribe((event) => {
        this.componenteAperto.set('');

        if (event.url === '/home') {
          this.isHome.set(true);

          runInInjectionContext(this.injector, () => {
            effect(() => this.handleUserSubscription(this.authService.user()));
          });
        } else {
          this.isHome.set(false);
        }
      });
  }

  private handleUserSubscription(user: User | null): void {
    if (user) {
      this.user = user;
      this.inizialiUser = this.calculateUserInitials(user.credenziali.nome);
      this.elementiUtenteUtilities
        .getElementiUtente(user.id, false)
        .pipe(take(1))
        .subscribe();
    } else {
      this.setAnonymousUser();
    }
    if (this.authService.getUsers.length === 0) {
      this.sottoscrizioneUtenti({
        nextCall: (data) => this.handleUsersSubscription(data),
      });
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
    this.user = this.getVoidUser();
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

    this.authService.setUsers = otherUsers;
    sessionStorage.setItem('users', JSON.stringify(otherUsers));
  }

  public controlloPunteggio(): void {
    if (this.punteggioCanzoni < this.user.iscrizione.punteggio!) {
      this.router.navigate(['/canzoni']);
    } else {
      const { path, titolo, messaggio } = getConfirmParams(this.user);
      this.confirmCustom({
        titolo: titolo,
        messaggio: messaggio,
        confirmFunc: () => this.router.navigate([path]),
      });
    }
  }
}
