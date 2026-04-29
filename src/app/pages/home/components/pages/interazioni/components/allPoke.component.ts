import { Component, inject, OnInit, signal } from '@angular/core';
import {
  ChangePageHttp,
  RecordColonne,
  TabellaCustomComponent,
} from '../../../../../../shared/components/custom/tabella-custom.component';
import { DataTableHttp } from '../../../../../../shared/utilities/functions/pagination.utilities';
import {
  Interazione,
  InterazioniPaginate,
} from '../interfaces/interazioni.interface';
import { InterazioniService } from '../services/interazioni.service';
import { getPokePaginate } from '../handlers/interazioni.handler';
import { take } from 'rxjs';

@Component({
  selector: 'app-all-poke',
  standalone: true,
  imports: [TabellaCustomComponent],
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
      @if (interazioniHttp()) {
        <app-table-custom
          [colonne]="colonne"
          [dataTableHttp]="interazioniHttp()"
          [elemForPage]="elemForPage"
          [titoloTabella]="'Top Miciomani Innamorati'"
          (changeElements)="changeElements($event)"
        ></app-table-custom>
      }
    </div>
  `,
})
export class AllPokeComponent implements OnInit {
  public interazioniService = inject(InterazioniService);
  private primaVolta: boolean = true;
  public elemForPage = signal<number>(3);
  public interazioniHttp = signal<DataTableHttp<Interazione> | null>(null);

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
    conteggio: {
      titolo: 'Conteggio',
      lunghezza: '5rem',
      sortCol: true,
    },
    ultimoInvio: {
      titolo: 'Ultimo Invio',
      lunghezza: '15rem',
      sortCol: true,
    },
  };

  ngOnInit(): void {
    getPokePaginate({
      interazioniService: this.interazioniService,
      el: this.elemForPage(),
      num: 1,
      ord: 'desc',
      key: 'conteggio',
      nextCallback: (interazioni: InterazioniPaginate) => {
        this.interazioniHttp.set({
          elems: signal(interazioni.elems),
          totalElems: signal(interazioni.totElems),
          totalPages: signal(
            Math.ceil(interazioni.totElems / this.elemForPage()),
          ),
        });
      },
    });
  }

  public changeElements(change: ChangePageHttp): void {
    if (this.primaVolta) {
      this.primaVolta = false;
      return;
    }

    this.interazioniHttp()!.elems.set([]);

    getPokePaginate({
      interazioniService: this.interazioniService,
      el: change.elemForPage,
      num: change.page,
      ord: change.order ? change.order : 'desc',
      key: change.orderKey ? change.orderKey : 'conteggio',
      nextCallback: (interazioni: InterazioniPaginate) => {
        this.interazioniHttp()!.elems.set(interazioni.elems);
        this.interazioniHttp()!.totalElems.set(interazioni.totElems);
        this.interazioniHttp()!.totalPages.set(
          Math.ceil(interazioni.totElems / this.elemForPage()),
        );
      },
    });
  }
}
