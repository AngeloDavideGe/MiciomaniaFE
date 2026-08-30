import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ACCOUNTS_USER_KEY,
  CURRENT_LANG_KEY,
  CURRENT_USER_KEY,
  getStoredAccountsUser,
  getStoredCurrentUser,
} from './core/functions/storage.function';
import { AuthService } from './shared/services/auth.service';
import { AppConfigService } from './core/api/appConfig.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main id="main">
      <router-outlet />
    </main>
  `,
  styles: `
    #main {
      background-color: var(--background);
    }
  `,
})
export class AppComponent {
  private authService = inject(AuthService);
  private appConfig = inject(AppConfigService);

  constructor() {
    this.authService.currentUser.set(getStoredCurrentUser());
    this.authService.accountsUser.set(getStoredAccountsUser());
  }

  @HostListener('window:beforeunload')
  saveCurrentUser(): void {
    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(this.authService.currentUser()),
    );

    localStorage.setItem(
      ACCOUNTS_USER_KEY,
      JSON.stringify(this.authService.accountsUser()),
    );

    localStorage.setItem(
      CURRENT_LANG_KEY,
      JSON.stringify(this.appConfig.currentLang()),
    );
  }
}
