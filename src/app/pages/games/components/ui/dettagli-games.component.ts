import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { SquadreHandler } from '../../../../shared/handlers/squadre.handler';
import { SquadreGiocatore } from '../../interfaces/games.interfaces';

@Component({
  selector: 'app-punteggi-games',
  standalone: true,
  imports: [],
  template: `
    <div
      class="alert alert-info mt-4"
      style="
      font-size: 1.1rem;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      background-color: #e7f8ff;
      border-left: 5px solid #17a2b8;
      padding: 1.25rem 1.5rem;
    "
    >
      <div class="mb-3">
        Se hai effettuato il login e completato l'iscrizione in home scegliendo
        una squadra, i punti guadagnati in questi minigiochi saranno assegnati
        alla tua squadra!
      </div>

      <div class="mb-2">
        Punteggio Personale:
        <strong class="ms-2 fs-5 badge" style="color: black">
          {{ punteggioPersonale }}
        </strong>
      </div>

      <div class="mb-2">
        Punteggio in fase di valutazione:
        <strong class="ms-2 fs-5 badge" style="color: black">
          {{ sc.punteggioOttenuto }}
        </strong>
      </div>

      <div class="mb-2">
        Squadre Giocatore: @if (squadre.personale.length > 0) { @for (squadra of
        squadre.personale; track squadra.nome) {
        <strong class="ms-2 fs-5 badge bg-primary">
          {{ squadra.nome + ' (' + squadra.punteggio + ' punti)' }}
        </strong>
        } } @else {
        <span class="ms-2 text-muted">Nessuna squadra</span>
        }
      </div>

      <div class="mb-0">
        Squadre Avversarie: @if (squadre.avversario.length > 0) { @for (squadra
        of squadre.avversario; track squadra.nome) {
        <strong class="ms-2 fs-5 badge bg-danger">
          {{ squadra.nome + ' (' + squadra.punteggio + ' punti)' }}
        </strong>
        } } @else {
        <span class="ms-2 text-muted">Nessuna squadra</span>
        }
      </div>
    </div>
  `,
  styles: [``],
})
export class PunteggiGamesComponent {
  public sc = inject(SquadreHandler);
  @Input() punteggioPersonale!: number;
  @Input() squadre!: SquadreGiocatore;
}
