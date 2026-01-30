import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { Classifica } from '../../../../../../../shared/interfaces/squadre.interface';
import { SquadreLang } from '../../languages/interfaces/squadre-lang.interface';
import { punteggi_imports } from './imports/punteggi.import';

@Component({
  selector: 'app-punteggi-component',
  imports: punteggi_imports,
  template: `
    @if (classifica().squadre.length > 0) {
      <div class="mt-5 p-4 rounded-3">
        <app-lista-squadre
          [squadreLang]="squadreLang"
          [classifica]="classifica()"
        ></app-lista-squadre>

        <app-chart-custom
          [giocatori]="classifica().giocatori"
          [squadre]="classifica().squadre"
        ></app-chart-custom>

        <app-bottoni-squadre
          (captureElement)="captureElement.emit()"
        ></app-bottoni-squadre>
      </div>
    } @else {
      <div
        class="d-flex justify-content-center align-items-center spinner-template-stile"
        style="margin-top: 5rem"
      >
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  `,
})
export class PunteggiComponent {
  @Input() squadreLang!: SquadreLang;
  @Input() classifica!: Signal<Classifica>;
  @Output() captureElement = new EventEmitter<void>();
}
