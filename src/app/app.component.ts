import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { gestisciCursore } from '../library/functions/cursor.functions';
import { AppConfigService } from './core/api/appConfig.service';
import {
  getStoredAccountsUser,
  getStoredCurrentUser,
} from './core/functions/storage.getFunction';
import { setLocalStorage } from './core/functions/storage.setFunction';
import { AuthService } from './shared/services/auth.service';

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
export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  private appConfig = inject(AppConfigService);

  constructor() {
    this.authService.currentUser.set(getStoredCurrentUser());
    this.authService.accountsUser.set(getStoredAccountsUser());
  }

  ngOnInit(): void {
    gestisciCursore(this.appConfig.currentCursor());
  }

  @HostListener('window:beforeunload')
  setLocalStorage(): void {
    setLocalStorage(this.authService, this.appConfig);
  }
}
