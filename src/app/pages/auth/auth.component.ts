import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, Observable, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  template: `
    @if (isAuth$ | async) {
    <div class="container d-flex justify-content-center align-items-center">
      <div class="row w-100">
        <div class="mx-auto" [class]="col()" [style.margin-top]="marginTop()">
          <div class="card shadow-sm">
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
    </div>
    }
  `,
})
export class AuthComponent {
  private router = inject(Router);

  public isAuth$: Observable<boolean> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    startWith({ url: this.router.url }),
    map((event) => this.mapFunc(event.url))
  );

  public col = signal<string>('col-12');
  public marginTop = signal<string>('');

  private mapFunc(url: string): boolean {
    switch (url) {
      case '/auth':
        this.router.navigate(['/home']);
        return false;
      case '/auth/iscrizione':
        this.col.set('col-12');
        this.marginTop.set('1rem');
        return true;
      case '/auth/sign-in':
        this.col.set('col-12 col-md-8 col-lg-6');
        this.marginTop.set('3rem');
        return true;
      default:
        this.col.set('col-12 col-md-8 col-lg-6');
        this.marginTop.set('6rem');
        return true;
    }
  }
}
