import { Component, inject, signal } from '@angular/core';
import { feature_imports } from './feature.import';
import {
  getBottomNavItems,
  getFeatureNavbar,
} from './functions/feature.function';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isCurrentRoute } from '../../../library/functions/router.function';
import { AppConfigService } from '../../core/api/appConfig.service';

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

      <app-bottom-navbar-indy
        [pulsanti]="pulsantiBottombar"
        [initialPulsante]="initialPulsante()"
      />
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
  private appConfig = inject(AppConfigService);

  public readonly lang = this.appConfig.lang.Feature;
  public readonly pulsantiNavbar = getFeatureNavbar(
    this.router,
    this.lang.Navbar,
  );
  public readonly pulsantiBottombar = getBottomNavItems(
    this.router,
    this.lang.Navbar,
  );

  public initialPulsante = signal<string>('manga');

  public isFeature$: Observable<boolean> = isCurrentRoute({
    router: this.router,
    eventName: '/feature',
    mapFunc: (event: { url: string }) => {
      const cond: boolean = event.url == '/feature';

      if (cond) {
        this.router.navigate(['feature/manga']);
        this.initialPulsante.set('manga');
      } else {
        this.initialPulsante.set(event.url.split('/')[2]);
      }

      return cond;
    },
  });
}
