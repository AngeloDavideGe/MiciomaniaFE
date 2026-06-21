import { Component, signal } from '@angular/core';
import { of } from 'rxjs';
import { CronCustomComponent } from '../../../../../../../../../library/components/cron/cron.component';
import { TabellaCustomComponent } from '../../../../../../../../../library/components/table/table.component';
import { handlerFunc } from '../../../../../../../../../library/functions/handler.function';
import {
  AzioniTabella,
  RecordColonne,
} from '../../../../../../../../../library/interfaces/table.interface';
import { CronObbligatori } from '../../../../../../../../../library/interfaces/cron.interface';

@Component({
  selector: 'app-cron-admin',
  standalone: true,
  imports: [CronCustomComponent, TabellaCustomComponent],
  template: `
    <div class="elemento-centrato">
      <app-table-custom
        [elemTable]="dataTable"
        [colonne]="colonne"
        [azioni]="azioni"
        [lunghezzaAzioni]="'3rem'"
        [titoloTabella]="'Lista processi periodici'"
        [arrayElemForPage]="[]"
      ></app-table-custom>
    </div>

    @if (selectRow()) {
      <app-cron-custom
        (chiudiCron)="selectRow.set(null)"
        (invioStringaCron)="selectRow()!.callHttp($event)"
        [campiObbligatori]="cronObbligatori"
      ></app-cron-custom>
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
