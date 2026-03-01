import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  Signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  AzioniTabella,
  RecordColonne,
  TabellaCustomComponent,
} from '../../../../../../../shared/components/custom/tabella-custom.component';
import { Ruolo } from '../../../../../../../shared/enums/users.enum';
import {
  User,
  UserParams,
} from '../../../../../../../shared/interfaces/users.interface';
import { AdminLang } from '../../languages/interfaces/admin-lang.interface';

@Component({
  selector: 'app-griglia-admin',
  standalone: true,
  imports: [TabellaCustomComponent],
  template: `
    <div class="grid-card-layout" style="--card-width: 30rem;">
      @for (ruolo of ruoli; track $index) {
        <app-table-custom
          [titoloTabella]="ruolo"
          [elemTable]="userMapByRuolo[ruolo]"
          [noElement]="adminLang.nessunUtente"
          [elemForPage]="5"
          [colonne]="colonne"
          [azioni]="pulsanti"
        ></app-table-custom>
      }
    </div>
  `,
})
export class GrigliaAdminComponent {
  private router = inject(Router);
  public ruoli = Object.values(Ruolo);

  @Input() adminLang!: AdminLang;
  @Input() user!: User | null;
  @Input() userMapByRuolo!: Record<Ruolo, Signal<UserParams[]>>;
  @Output() modificaRuolo = new EventEmitter<UserParams>();
  @Output() eliminaRuolo = new EventEmitter<UserParams>();

  public readonly colonne: Partial<RecordColonne<UserParams>> = {
    nome: {
      titolo: 'Nome',
      lunghezza: '10rem',
    },
    id: {
      titolo: 'ID',
      lunghezza: '10rem',
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
    if (this.user?.credenziali.ruolo !== Ruolo.MICIOMANE || !this.user) {
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
