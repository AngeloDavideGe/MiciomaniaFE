import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isCurrentRoute } from '../../../library/functions/router.function';
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
  public menuOpen = signal<string>('');

  public readonly impostazioniToggle = getToggleProps();
  public readonly cardsHome = getCategorieCard();

  public isHome$: Observable<boolean> = isCurrentRoute({
    router: this.router,
    eventName: '/home',
    tapFunc: (isCurrent: boolean) => {
      if (isCurrent) {
      }
    },
  });
}
