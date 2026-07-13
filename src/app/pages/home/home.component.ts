import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isCurrentRoute } from '../../../library/functions/router.function';
import { getToggleProps } from './functions/home.functions';
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

  public readonly impostazioniToggle = getToggleProps();

  public isHome$: Observable<boolean> = isCurrentRoute({
    router: this.router,
    eventName: '/home',
    tapFunc: (isCurrent: boolean) => {
      if (isCurrent) {
      }
    },
  });
}
