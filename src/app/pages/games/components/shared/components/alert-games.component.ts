import { Component, Input } from '@angular/core';
import { EsitoGame } from '../../../interfaces/games.interfaces';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-alerts-game',
  standalone: true,
  imports: [NgClass],
  template: `
    <div
      class="position-fixed top-0 start-50 translate-middle-x w-100 d-flex justify-content-center"
      style="z-index: 1050; pointer-events: none; padding-top: 1.5rem;"
    >
      <div
        class="alert shadow-lg border-2 px-4 py-3 fw-bold text-center"
        [ngClass]="{
          'bg-success border-success': esito === 'vittoria',
          'bg-danger border-danger': esito === 'sconfitta',
          'bg-warning border-warning text-dark': esito === 'pareggio',
        }"
        style="
          border-radius: 1rem;
          font-size: 1.3rem;
          max-width: 500px;
          width: 80%;
          color: white;
          box-shadow: 0 4px 16px rgba(0,0,0,0.18);
          pointer-events: auto;
        "
      >
        {{ getMessageByEsito(esito) }}
      </div>
    </div>
  `,
})
export class AlertsGameComponent {
  @Input() esito: EsitoGame = 'vittoria';

  getMessageByEsito(esito: EsitoGame): string {
    switch (esito) {
      case 'vittoria':
        return 'Hai vinto!';
      case 'sconfitta':
        return 'Hai perso!';
      case 'pareggio':
        return 'Pareggio!';
      default:
        return '';
    }
  }
}
