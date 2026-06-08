import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { Router } from '@angular/router';
import { TabellaCustomComponent } from '../../../../../../../library/components/table/table.component';
import { BadgeRuolo, Ruolo } from '../../../../../../shared/enums/users.enum';
import {
  User,
  UserParams,
} from '../../../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../../../shared/services/api/auth.service';

import { converUserParams } from '../../../../functions/home.functions';
import { AdminLang } from '../languages/interfaces/admin-lang.interface';
import {
  AzioniTabella,
  RecordColonne,
} from '../../../../../../../library/interfaces/table.interface';
import { TabsComponent } from '../../../../../../../library/components/tabs/tabs.component';

@Component({
  selector: 'app-griglia-admin',
  standalone: true,
  imports: [TabellaCustomComponent, TabsComponent],
  template: `
    <app-tabs-custom
      [tipo]="'lista'"
      (clickTab)="tabellaView.set($event)"
    ></app-tabs-custom>

    @if (tabellaView() === '1') {
      <div class="elemento-centrato">
        <app-table-custom
          [titoloTabella]="adminLang.tuttiGliUtenti"
          [elemTable]="allUSers"
          [noElement]="adminLang.nessunUtente"
          [elemForPage]="elemForAllPage"
          [colonne]="colonneSingle"
          [azioni]="pulsanti"
          [recordBadge]="badgeRuolo"
        ></app-table-custom>
      </div>
    } @else {
      <div class="grid-card-layout" style="--card-width: 30rem;">
        @for (ruolo of ruoli; track $index) {
          <app-table-custom
            [titoloTabella]="ruolo"
            [elemTable]="userMapByRuolo[ruolo]"
            [noElement]="adminLang.nessunUtente"
            [elemForPage]="elemForPage[ruolo]"
            [colonne]="colonne"
            [azioni]="pulsanti"
          ></app-table-custom>
        }
      </div>
    }
  `,
})
export class GrigliaAdminComponent {
  private router = inject(Router);
  public authService = inject(AuthService);

  public ruoli: Ruolo[] = Object.values(Ruolo);
  public tabellaView = signal<string>('1');
  public elemForAllPage = signal<number>(5);

  public elemForPage = this.ruoli.reduce(
    (acc, ruolo) => {
      acc[ruolo] = signal<number>(5);
      return acc;
    },
    {} as Record<Ruolo, WritableSignal<number>>,
  );

  public allUSers = computed<UserParams[]>(() => {
    const others: UserParams[] = this.authService.users();

    if (this.user) {
      return [converUserParams(this.user), ...others];
    } else {
      return others;
    }
  });

  @Input() adminLang!: AdminLang;
  @Input() user!: User | null;
  @Input() userMapByRuolo!: Record<Ruolo, Signal<UserParams[]>>;
  @Output() modificaRuolo = new EventEmitter<UserParams>();
  @Output() eliminaRuolo = new EventEmitter<UserParams>();

  public readonly badgeRuolo: Record<Ruolo, string> = BadgeRuolo;

  public readonly colonne: Partial<RecordColonne<UserParams>> = {
    nome: {
      titolo: 'Nome',
      lunghezza: '10rem',
      sortCol: true,
    },
    id: {
      titolo: 'ID',
      lunghezza: '10rem',
      sortCol: true,
    },
  };

  public readonly colonneSingle: Partial<RecordColonne<UserParams>> = {
    ...this.colonne,
    ruolo: {
      titolo: 'Ruolo',
      lunghezza: '7rem',
      sortCol: true,
      formatCell: (value: Ruolo) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
    },
  };

  public pulsanti: AzioniTabella<UserParams>[] = [
    {
      icona: 'bi bi-person-circle',
      titolo: 'this.adminLang.vediProfilo',
      azione: (user: UserParams) => {
        this.router.navigate(['/posts/profilo', user.id], {
          state: { message: 'TableUserParams' },
        });
      },
    },
    {
      icona: 'bi bi-pencil-square',
      titolo: 'this.adminLang.modifica',
      azione: (user: UserParams) => {
        if (this.controlliCustom('modificare', user) == 0) {
          this.modificaRuolo.emit(user);
        }
      },
    },
    {
      icona: 'bi bi-trash3',
      titolo: 'this.adminLang.elimina',
      azione: (user: UserParams) => {
        if (this.controlliCustom('eliminare', user) == 0) {
          this.eliminaRuolo.emit(user);
        }
      },
    },
  ];

  private controlliCustom(str: string, user: UserParams): number {
    if (!this.user || this.user.credenziali.ruolo !== Ruolo.miciomane) {
      alert(`Non hai i permessi per ${str} questo ruolo.`);
      return -1;
    }

    if (user.id == this.user.id) {
      alert(`Non puoi ${str} il tuo ruolo.`);
      return -1;
    }

    return 0;
  }
}
