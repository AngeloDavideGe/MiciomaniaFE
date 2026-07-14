import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isCurrentRoute } from '../../../library/functions/router.function';
import { getCategorieCard, getToggleProps } from './functions/home.functions';
import { home_imports } from './home.imports';
import { handlerFunc } from '../../../library/functions/handler.function';
import { UserParams } from '../../shared/interfaces/users.interface';
import { AuthService } from '../../shared/services/api/auth.service';

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

  public readonly impostazioniToggle = getToggleProps();
  public readonly cardsHome = getCategorieCard();
  public menuOpen = signal<string>('');

  public isHome$: Observable<boolean> = isCurrentRoute({
    router: this.router,
    eventName: '/home',
    tapFunc: (isCurrent: boolean) => {
      if (isCurrent) {
        this.loadAllUsers();
      }
    },
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
}
