import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  Signal,
} from '@angular/core';
import { Classifica } from '../../../../../../../shared/interfaces/squadre.interface';
import { SquadreService } from '../../../../../../../shared/services/api/squadre.service';
import { SquadreLang } from '../../languages/interfaces/squadre-lang.interface';
import { BottoniSquadreComponent } from '../bottoni-squadre.component';
import { ChartsComponent } from '../charts.component';
import { ListaSquadreComponent } from '../lista-squadre.component';

@Component({
  selector: 'app-punteggi-component',
  imports: [ListaSquadreComponent, ChartsComponent, BottoniSquadreComponent],
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
  public squadreService = inject(SquadreService);

  @Input() squadreLang!: SquadreLang;
  @Input() classifica!: Signal<Classifica>;
  @Output() captureElement = new EventEmitter<void>();
}
