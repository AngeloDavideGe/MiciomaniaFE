import { Component, OnDestroy, OnInit } from '@angular/core';
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
  public isHome: boolean = false;
  public user: User = {} as User;
  public inizialiUser: string = '';
  private punteggioCanzoni: number = 50;
  public componenteAperto: string = '';
  private destroy$ = new Subject<void>();
  public chiudiComponente: Function = () => (this.componenteAperto = '');
  public goToProfilo: Function = (path: string) => this.router.navigate([path]);
  private elementiUtenteUtilities = new ElementiUtenteUtilities();

  ngOnInit(): void {
    if (this.router.url === '/home') {
      this.isHome = true;
      this.sottoscrizioneUtente({
        userFunc: (user) => this.handleUserSubscription(user),
        destroy$: this.destroy$,
      });
    }
    this.routerEvents();
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
    this.authService.users.push(this.converUserParams(this.user));
    this.profiloService.profiloPersonale = null;
    sessionStorage.setItem('users', JSON.stringify(this.authService.users));
    this.authService.logout();
    this.setAnonymousUser();
  }

  private routerEvents(): void {
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        distinctUntilChanged((prev, curr) => prev.url === curr.url)
      )
      .subscribe((event: NavigationEnd) => {
        this.componenteAperto = '';

        if (event.url === '/home') {
          this.isHome = true;
          this.sottoscrizioneUtente({
            userFunc: (user) => this.handleUserSubscription(user),
            destroy$: this.destroy$,
          });
        } else if (this.isHome) {
          this.isHome = false;
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
    if (this.authService.users.length === 0) {
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

    this.authService.users = otherUsers;
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
