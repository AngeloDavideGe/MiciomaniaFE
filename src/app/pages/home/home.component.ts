import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { handlerFunc } from '../../../library/functions/handler.function';
import { isCurrentRoute } from '../../../library/functions/router.function';
import { UserReduced } from '../../../library/interfaces/chat.interface';
import {
  MenuElements,
  ToggleProps,
} from '../../../library/interfaces/toggle.interface';
import { AppConfigService } from '../../core/api/appConfig.service';
import {
  CronUtenti,
  UserParams,
} from '../../shared/interfaces/users.interface';
import { AuthService } from '../../shared/services/auth.service';
import { getCategorieCard, getToggleProps } from './functions/home.functions';
import { home_imports } from './home.imports';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: home_imports,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public router = inject(Router);
  private authService = inject(AuthService);
  private appConfig = inject(AppConfigService);

  public readonly pic = this.appConfig.config.defaultPicsUrl.user;
  public readonly impostazioniToggle = getToggleProps();
  public readonly cardsHome = getCategorieCard();

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
      menuElementi: notifiche.map((x: CronUtenti) => {
        const menu: MenuElements = {
          azione: () => {},
          testo: x.idUtente + x.azione,
          condition: true,
          image: usersPic[x.idUtente].pic || this.pic,
        };

        return menu;
      }),
    };

    return [toggle];
  });

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
