import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './shared/interfaces/users.interface';
import { AuthService } from './shared/services/auth.service';

const CURRENT_USER_KEY: string = 'currentUtente';

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
  private readonly authService = inject(AuthService);

  constructor() {
    this.authService.currentUser.set(this.getStoredCurrentUser());
  }

  @HostListener('window:beforeunload')
  saveCurrentUser(): void {
    const currentUser = this.authService.currentUser();

    if (currentUser) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }

  private getStoredCurrentUser(): User | null {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as User;
    } catch {
      localStorage.removeItem(CURRENT_USER_KEY);
      return null;
    }
  }
}
