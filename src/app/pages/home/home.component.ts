import { NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import 'bootstrap'; // Importa Bootstrap JS (incluso Popper.js)
import { distinctUntilChanged, filter, Subject, takeUntil } from 'rxjs';
import { AuthCustom } from '../../shared/custom/auth-custom.class';
import { NotificheService } from '../../shared/services/notifiche.service';
import { User, UserParams } from '../auth/interfaces/users.interface';
import { Messaggio } from '../chat-group/interfaces/chat-group.interface';
import { ChatGroupService } from '../chat-group/services/chat-group.service';
import { CardHomeComponent } from './components/card-home/card-home.component';
import { CercaProfiliComponent } from './components/cerca-profili/cerca-profili.component';
import { CursoreComponent } from './components/cursore/cursore.component';
import { NavBarComponent } from './components/nav-bar/navbar.component';
import { SocialLinkComponent } from './components/social-link/social-link.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardHomeComponent,
    SocialLinkComponent,
    CercaProfiliComponent,
    RouterLink,
    NgIf,
    RouterOutlet,
    NavBarComponent,
    CursoreComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent extends AuthCustom implements OnInit, OnDestroy {
  public user: User = {} as User;
  public inizialiUser: string = '';
  public componenteAperto: string = '';
  private appenaAperto: boolean = true;
  private destroy$ = new Subject<void>();
  public chiudiComponente: Function = () => (this.componenteAperto = '');
  public goToProfilo: Function = (path: string) => this.router.navigate([path]);

  private notificheService = inject(NotificheService);
  private chatGroupService = inject(ChatGroupService);

  ngOnInit(): void {
    if (this.router.url === '/home') {
      this.sottoscrizioneUtente({
        userFunc: (user) => this.handleUserSubscription(user),
        destroy$: this.destroy$,
      });
    }
    this.routerEvents();
    this.sottoscrizioneNotifiche();
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
      confirmFunc: () => {
        this.confirmLogout();
      },
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
          this.sottoscrizioneUtente({
            userFunc: (user) => this.handleUserSubscription(user),
            destroy$: this.destroy$,
          });
        }
      });
  }

  private handleUserSubscription(user: User | null): void {
    if (user) {
      this.user = user;
      this.inizialiUser = this.calculateUserInitials(user.credenziali.nome);
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
    const nomi = nome.split(' ');
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
    const userFind = data.find((x) => x.id === this.user.id);
    if (userFind) {
      this.user.id = userFind.id;
      this.user.credenziali.nome = userFind.nome;
      this.user.credenziali.profilePic = userFind.profilePic;
    }
    this.authService.users = data.filter((x) => x.id != this.user.id);
    sessionStorage.setItem('users', JSON.stringify(this.authService.users));
  }

  private sottoscrizioneNotifiche(): void {
    this.chatGroupService.messages$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        const ultimoMessaggio: Messaggio = data[data.length - 1];
        if (ultimoMessaggio?.sender != this.user.id && !this.appenaAperto) {
          this.notificheService.show(
            ultimoMessaggio.sender,
            ultimoMessaggio.content
          );
        }
        this.appenaAperto = false;
      },
    });
  }
}
