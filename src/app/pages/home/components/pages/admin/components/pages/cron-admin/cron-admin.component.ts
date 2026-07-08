import { Component, signal } from '@angular/core';
import { of } from 'rxjs';
import { CronIndyComponent } from '../../../../../../../../../library/components/cron/cron-indy.component';
import { TabellaIndyComponent } from '../../../../../../../../../library/components/table/table-indy.component';
import { handlerFunc } from '../../../../../../../../../library/functions/handler.function';
import {
  AzioniTabella,
  RecordColonne,
} from '../../../../../../../../../library/interfaces/table.interface';
import { CronObbligatori } from '../../../../../../../../../library/interfaces/cron.interface';

@Component({
  selector: 'app-cron-admin',
  standalone: true,
  imports: [CronIndyComponent, TabellaIndyComponent],
  template: `
    <div class="elemento-centrato">
      <app-table-indy
        [elemTable]="dataTable"
        [colonne]="colonne"
        [azioni]="azioni"
        [lunghezzaAzioni]="'3rem'"
        [titoloTabella]="'Lista processi periodici'"
        [arrayElemForPage]="[]"
      ></app-table-indy>
    </div>

    @if (selectRow()) {
      <app-cron-indy
        (chiudiCron)="selectRow.set(null)"
        (invioStringaCron)="selectRow()!.callHttp($event)"
        [campiObbligatori]="cronObbligatori"
      ></app-cron-indy>
    }
  `,
})
export class CronAdminComponent {
  public selectRow = signal<CronTable | null>(null);

  public readonly cronObbligatori: CronObbligatori = {
    hour: true,
  };

  public dataTable = signal<CronTable[]>([
    {
      title: 'Calandra',
      cron: '* * * * *',
      callHttp: (cron: string) =>
        handlerFunc<void>({
          callHttp: () => of(),
          finalizeCall: () => this.selectRow.set(null),
        }),
    },
    {
      title: 'Sirius',
      cron: '* * * * *',
      callHttp: (cron: string) =>
        handlerFunc<void>({
          callHttp: () => of(),
          finalizeCall: () => this.selectRow.set(null),
        }),
    },
  ]);

  public readonly colonne: Partial<RecordColonne<CronTable>> = {
    title: {
      titolo: 'Nome',
      lunghezza: '25rem',
      sortCol: true,
      filtro: signal<string>(''),
    },
    cron: {
      titolo: 'Cron',
      lunghezza: '10rem',
    },
  };

  public azioni: AzioniTabella<CronTable>[] = [
    {
      icona: 'bi bi-person',
      titolo: 'Attiva cron',
      azione: (elem: CronTable) => this.selectRow.set(elem),
    },
  ];
}

interface CronTable {
  title: string;
  cron: string;
  callHttp: (cron: string) => void;
}
