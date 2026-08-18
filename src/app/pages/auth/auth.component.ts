import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { isCurrentRoute } from '../../../library/functions/router.function';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  template: `
    @if (isAuth$ | async) {
      <router-outlet></router-outlet>
    }
  `,
})
export class AuthComponent {
  private router = inject(Router);

  public isAuth$: Observable<boolean> = isCurrentRoute({
    router: this.router,
    eventName: '/auth',
    mapFunc: (event) => {
      if (event.url == '/auth') {
        this.router.navigate(['/home']);
        return false;
      } else {
        return true;
      }
    },
  });
}
