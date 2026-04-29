import { Component, signal } from '@angular/core';
import {
  CustomNavBarComponent,
  NavBarButton,
} from '../../../../../shared/components/custom/navbar-custom.component';
import { componentInterazioni } from '../admin/interfaces/admin.interface';
import { AllPokeComponent } from './components/allPoke.component';

@Component({
  selector: 'app-interazioni.component',
  imports: [CustomNavBarComponent, AllPokeComponent],
  template: `
    <app-custom-navbar
      [altriBottoni]="bottoniNavbar"
      [selected]="component"
    ></app-custom-navbar>

    @switch (component()) {
      @case ('All') {
        <app-all-poke></app-all-poke>
      }
      @case ('personal') {
        <!-- <app-poke-personali></app-poke-personali> -->
      }
    }
  `,
})
export class InterazioniComponent {
  public component = signal<componentInterazioni>('All');

  public bottoniNavbar: NavBarButton[] = [
    {
      icon: 'bi bi-clipboard2-data"',
      title: 'Tutti i Poke',
      action: () => this.component.set('All'),
    },
    {
      icon: 'bi bi-clipboard2-check',
      title: 'Poke personali',
      action: () => this.component.set('personal'),
    },
  ];
}
