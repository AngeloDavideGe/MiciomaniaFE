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
    <router-outlet />
    <app-bottom-navbar-indy [pulsanti]="pulsantiBottombar" />
  `,
})
export class FeatureComponent {
  public readonly pulsantiNavbar = getFeatureNavbar();
  public readonly pulsantiBottombar = getBottomNavItems();
}
