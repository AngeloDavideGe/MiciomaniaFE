import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presentazione-games',
  standalone: true,
  imports: [],
  template: `
    <h1
      class="display-4 fw-bold text-primary"
      style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2)"
    >
      Miciomania Games
    </h1>

    <p
      class="lead mt-4"
      style="font-size: 1.2rem; line-height: 1.8; color: #555"
    >
      Benvenuti in <strong>Miciomania Games</strong>, il paradiso dei giochi
      dove emozioni e divertimento si incontrano! Qui non si gioca solo per
      vincere, ma per vivere esperienze uniche che ti faranno ridere, pensare e
      competere. Ogni partita è un'avventura che ti permette di guadagnare punti
      per la tua squadra preferita: <span class="text-danger">Alcamo</span> o
      <span class="text-success">Miciomania</span>. Scegli con saggezza, gioca
      con passione e scopri chi dominerà la classifica! Te la senti?
    </p>

    <div
      class="d-flex justify-content-center align-items-center gap-3 mt-3"
      style="flex-wrap: wrap"
    >
      <button
        class="btn btn-outline-danger"
        style="font-size: 1.1rem; padding: 0.5rem 1.5rem; border-radius: 30px"
        (click)="this.router.navigate(['/home'])"
      >
        Torna Indietro
      </button>

      <button
        class="btn btn-outline-primary"
        style="font-size: 1.1rem; padding: 0.5rem 1.5rem; border-radius: 30px"
        (click)="showDetailsFunc.emit()"
      >
        {{ showDetails ? 'Nascondi Dettagli' : 'Mostra Dettagli' }}
      </button>
    </div>
  `,
  styles: [``],
})
export class PresentazioneGamesComponent {
  public router = inject(Router);
  @Input() showDetails!: boolean;
  @Output() showDetailsFunc = new EventEmitter<void>();
}
