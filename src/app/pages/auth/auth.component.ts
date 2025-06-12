import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, NgClass, AsyncPipe],
  template: `
    <div
      class="container min-vh-100 d-flex justify-content-center align-items-center"
    >
      <div class="row w-100">
        <div class="mx-auto" [ngClass]="colClass$ | async">
          <div class="card shadow-sm">
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AuthComponent {
  private router = inject(Router);

  public colClass$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    startWith({ url: this.router.url } as NavigationEnd),
    map((event) =>
      event.url === '/auth/iscrizione' ? 'col-md-12' : 'col-md-6'
    )
  );
}
