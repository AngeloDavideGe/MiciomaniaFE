import { Component } from '@angular/core';
import {
  BaseSegment,
  RuotaCustomComponent,
} from './components/ruota-custom.component';
import { DettagliGameComponent } from '../../shared/components/dettagli-game.component';

@Component({
  selector: 'app-ruota-fortuna',
  template: `
    <app-dettagli-game
      [titolo]="'Ruota della Fortuna '"
      [descrizione]="
        'Gira la ruota e scopri il tuo punteggio! Verrà assegnato anche alla tua squadra!'
      "
    >
      <div giocoContent class="justify-content-center">
        <app-ruota-custom [baseSegments]="baseSegments"></app-ruota-custom>
      </div>
    </app-dettagli-game>
  `,
  imports: [RuotaCustomComponent, DettagliGameComponent],
})
export class RuotaFortunaComponent {
  public baseSegments: BaseSegment[] = [
    { value: '100', color: '#FF5733' },
    { value: '200', color: '#33FF57' },
    { value: '300', color: '#3357FF' },
    { value: '400', color: '#F333FF' },
    { value: '500', color: '#33FFF5' },
    { value: '600', color: '#F5FF33' },
    { value: '700', color: '#FF33A8' },
    { value: '800', color: '#A833FF' },
  ];
}
