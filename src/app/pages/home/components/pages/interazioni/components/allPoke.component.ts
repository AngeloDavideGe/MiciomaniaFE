import { Component, inject, OnInit, signal } from '@angular/core';
import { SpinnerIndyComponent } from '../../../../../../../library/components/spinner/spinner-indy.component';
import { TabellaIndyComponent } from '../../../../../../../library/components/table/table-indy.component';
import { handlerFunc } from '../../../../../../../library/functions/handler.function';
import { RecordColonne } from '../../../../../../../library/interfaces/table.interface';
import { dateFormat } from '../../../../../../../library/pipes/date-format.pipe';
import { Interazione } from '../interfaces/interazioni.interface';
import { InterazioniService } from '../services/interazioni.service';

@Component({
  selector: 'app-all-poke',
  standalone: true,
  imports: [TabellaIndyComponent, SpinnerIndyComponent],
  template: `
    <div class="row mb-4">
      <div class="col-12 text-center">
        <h2 class="display-6 fw-bold mb-2" style="color: var(--primary-color);">
          Classifica degli Innamorati
        </h2>
        <p class="lead mb-0" style="color: var(--text-secondary);">
          Qui vedrai la classifica degli innamorati più attivi e coinvolti nella
          nostra community. Scopri chi sono i membri più appassionati e
          partecipa anche tu per scalare la classifica!
        </p>
      </div>
    </div>

    <div class="elemento-centrato">
      @if (interazioniService.allInterazioni().length > 0) {
        <app-table-indy
          [colonne]="colonne"
          [elemTable]="interazioniService.allInterazioni"
          [elemForPage]="elemForPage"
          [titoloTabella]="'Top Miciomani Innamorati'"
        ></app-table-indy>
      } @else {
        <app-spinner-indy mt="5rem"></app-spinner-indy>
      }
    </div>
  `,
})
export class AllPokeComponent implements OnInit {
  public interazioniService = inject(InterazioniService);
  public elemForPage = signal<number>(5);

  public readonly colonne: Partial<RecordColonne<Interazione>> = {
    user1: {
      titolo: 'User 1',
      lunghezza: '10rem',
      sortCol: true,
    },
    user2: {
      titolo: 'User 2',
      lunghezza: '10rem',
      sortCol: true,
    },
    ultimoInvio: {
      titolo: 'Ultimo Invio',
      lunghezza: '10rem',
      sortCol: true,
      formatCell: (value: Date) => dateFormat(value, 'dd mmmm yyyy'),
    },
    conteggio: {
      titolo: 'Conteggio',
      lunghezza: '5rem',
      sortCol: true,
    },
  };

  ngOnInit(): void {
    handlerFunc<Interazione[]>({
      skipCall: this.interazioniService.interazioniLoaded,
      callHttp: () => this.interazioniService.getAllInterazioni(),
      nextCall: (interazioni: Interazione[]) =>
        this.interazioniService.allInterazioni.set(interazioni),
      errorCall: () => (this.interazioniService.interazioniLoaded = false),
    });

    this.interazioniService.interazioniLoaded = true;
  }
}
