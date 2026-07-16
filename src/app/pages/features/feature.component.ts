import { Component } from '@angular/core';
import { feature_imports } from './feature.import';
import {
  getBottomNavItems,
  getFeatureNavbar,
} from './functions/feature.function';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: feature_imports,
  template: `
    <app-navbar-indy [pulsantiFine]="pulsantiNavbar" />
    <section class="router-section">
      <router-outlet />
    </section>
    <app-bottom-navbar-indy [pulsanti]="pulsantiBottombar" />
  `,
  styles: `
    .router-section {
      padding-top: 4.5rem;
      padding-bottom: 4.5rem;
    }
  `,
})
export class FeatureComponent {
  public readonly pulsantiNavbar = getFeatureNavbar();
  public readonly pulsantiBottombar = getBottomNavItems();
}
