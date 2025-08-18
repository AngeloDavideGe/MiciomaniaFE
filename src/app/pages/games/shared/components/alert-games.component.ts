import { Component, Input } from '@angular/core';
import { EsitoGame } from '../../interfaces/games.interfaces';

@Component({
  selector: 'app-alerts-game',
  standalone: true,
  imports: [],
  template: `
    <div
      class="alert-container d-flex justify-content-center"
      style="{
        position: 'fixed',
        width: '100%',
        zIndex: '1000',
        top: '20px'
      }"
    >
      <div
        class="alert"
        [class]="{
          'bg-success': esito === 'vittoria',
          'bg-danger': esito === 'sconfitta',
          'bg-warning': esito === 'pareggio'
        }"
        style="{
          padding: '20px',
          borderRadius: '10px',
          border: '2px solid black',
          fontSize: '1.5rem',
          color: 'white',
          fontWeight: 'bold',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
          width: '80%',
          maxWidth: '600px'
        }"
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
