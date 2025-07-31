import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, Observable, startWith, tap } from 'rxjs';

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

  public colClass$: Observable<string> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    startWith({ url: this.router.url }),
    map((event) => this.mapColClass(event.url)),
    tap((colMd) => {
      colMd === 'col-md-1' ? this.router.navigate(['/home']) : null;
    })
  );

  private mapColClass(url: string): string {
    switch (url) {
      case '/auth':
        return 'col-md-1';
      case '/auth/iscrizione':
        return 'col-md-12';
      default:
        return 'col-md-6';
    }
  }
}
