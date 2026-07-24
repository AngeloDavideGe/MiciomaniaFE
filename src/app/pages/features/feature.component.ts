import { Component, inject } from '@angular/core';
import { feature_imports } from './feature.import';
import {
  getBottomNavItems,
  getFeatureNavbar,
} from './functions/feature.function';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isCurrentRoute } from '../../../library/functions/router.function';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: feature_imports,
  template: `
    @if (!(isFeature$ | async)) {
      <app-navbar-indy [pulsantiFine]="pulsantiNavbar" />
      <section class="router-section">
        <router-outlet />
      </section>
      <app-bottom-navbar-indy [pulsanti]="pulsantiBottombar" />
    }
  `,
  styles: `
    .router-section {
      padding-top: 4.5rem;
      padding-bottom: 4.5rem;
    }
  `,
})
export class FeatureComponent {
  private router = inject(Router);

  public isFeature$: Observable<boolean> = isCurrentRoute({
    router: this.router,
    eventName: '/feature',
    tapFunc: (isCurrent: boolean) => {
      if (isCurrent) {
        this.router.navigate(['feature/manga']);
      }
    },
  });

  public readonly pulsantiNavbar = getFeatureNavbar(this.router);
  public readonly pulsantiBottombar = getBottomNavItems();
}
