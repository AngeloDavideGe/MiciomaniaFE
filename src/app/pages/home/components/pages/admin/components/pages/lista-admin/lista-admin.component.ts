import {
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { handlerFunc } from '../../../../../../../../../library/functions/handler.function';
import { RecordStruttura } from '../../../../../../../../../library/interfaces/form.interface';
import {
  AzioniTabella,
  RecordColonne,
} from '../../../../../../../../../library/interfaces/table.interface';
import {
  BadgeRuolo,
  Ruolo,
} from '../../../../../../../../shared/enums/users.enum';
import { sottoscrizioneUtentiCustom } from '../../../../../../../../shared/handlers/auth.handler';
import {
  User,
  UserParams,
} from '../../../../../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../../../../../shared/services/api/auth.service';
import { converUserParams } from '../../../../../../functions/home.functions';
import { listaAdmin_imports } from './lista-admin.imports';

@Component({
  selector: 'app-lista-admin',
  standalone: true,
  imports: listaAdmin_imports,
  templateUrl: './lista-admin.component.html',
})
export class ListaAdminComponent implements OnInit {
  public authService = inject(AuthService);
  public router = inject(Router);

  public editUser = signal<UserParams | null>(null);
  public ruoli = Object.values(Ruolo);
  public userMap = signal<Record<string, UserParams[]>>({});
  public userMapByRuolo: Record<string, Signal<UserParams[]>> = {};
  public pulsanti: AzioniTabella<UserParams>[] = [];
  public loadedAdmin = signal<boolean>(false);
  public strutturaForm: RecordStruttura = {};
  public tabellaView = signal<string>('1');
  public elemForAllPage = signal<number>(5);
  public formValido = signal<boolean>(true);

  public readonly badgeRuolo: Record<Ruolo, string> = BadgeRuolo;

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

  @Input() user: User | null = null;

  ngOnInit(): void {
    sottoscrizioneUtentiCustom({
      authService: this.authService,
      nextCall: () => this.mapUsersByRuolo(),
    });

    this.ruoli.forEach((ruolo: Ruolo) => {
      this.userMapByRuolo[ruolo] = computed<UserParams[]>(
        () => this.userMap()[ruolo] ?? [],
      );
    });

    this.pulsanti = [
      {
        icona: 'bi bi-person-circle',
        titolo: 'Vedi Profilo',
        azione: (user: UserParams) => {
          this.router.navigate(['/posts/profilo', user.id], {
            state: { message: 'TableUserParams' },
          });
        },
      },
      {
        icona: 'bi bi-pencil-square',
        titolo: 'Modifica',
        azione: (user: UserParams) => {
          if (this.controlliCustom('modificare', user) == 0) {
            this.modificaRuolo(user);
          }
        },
      },
      {
        icona: 'bi bi-trash3',
        titolo: 'Elimina',
        azione: (user: UserParams) => {
          if (this.controlliCustom('eliminare', user) == 0) {
            user.ruolo = Ruolo.user;

            handlerFunc<void>({
              callHttp: () =>
                this.authService.updateRuoloUtente(user.id, Ruolo.user),
              nextCall: () => this.nextEditUser(user),
            });
          }
        },
      },
    ];
  }

  private mapUsersByRuolo(): void {
    this.loadedAdmin.set(false);

    const users: UserParams[] = this.authService.users();
    const newMap: Record<string, UserParams[]> = Object.create(null);

    this.ruoli.forEach((ruolo: Ruolo) => (newMap[ruolo] = []));
    users.forEach((user: UserParams) => newMap[user.ruolo].push(user));

    if (this.user) {
      const ruoloUtente: Ruolo = this.user.credenziali.ruolo;
      const userConverted: UserParams = converUserParams(this.user);

      if (newMap[ruoloUtente]) {
        newMap[ruoloUtente].push(userConverted);
      } else {
        newMap[ruoloUtente] = [userConverted];
      }
    }

    this.userMap.set(newMap);
    this.loadedAdmin.set(true);
  }

  modificaRuolo(user: UserParams): void {
    this.strutturaForm = {
      nome: {
        titolo: 'Nome',
        tipo: 'Text',
        validators: [],
        readonly: true,
        valueInit: user.nome,
      },
      ruolo: {
        titolo: 'Ruolo',
        validators: [Validators.required],
        tipo: 'Select',
        valueInit: user.ruolo,
        errorMessage: 'Ruolo è obbligatorio',
        optionsSelect: Object.values(Ruolo),
        onChange: (x: any) =>
          this.editUser.update((user: UserParams | null) => {
            const temp: UserParams = user!;
            temp.ruolo = x;
            return temp;
          }),
      },
    };

    this.editUser.set(user);
  }

  onSave() {
    const user: UserParams = this.editUser()!;

    if (user.ruolo === Ruolo.miciomane) {
      alert('Non puoi modificare il ruolo in Miciomane.');
      return;
    }

    handlerFunc<void>({
      callHttp: () => this.authService.updateRuoloUtente(user.id, user.ruolo),
      nextCall: () => this.nextEditUser(this.editUser()!),
    });
  }

  private nextEditUser(user: UserParams): void {
    this.authService.users.update((x: UserParams[]) =>
      x.map((y: UserParams) => (y.id == user.id ? user : y)),
    );
    this.mapUsersByRuolo();
    this.editUser.set(null);
  }

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
