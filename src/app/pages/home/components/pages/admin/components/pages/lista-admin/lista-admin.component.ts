import {
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormCustomComponent } from '../../../../../../../../../library/components/form/form.component';
import { ModalCustomComponent } from '../../../../../../../../../library/components/modal/modal.component';
import { SpinnerComponent } from '../../../../../../../../../library/components/spinner/spinner.component';
import { handlerFunc } from '../../../../../../../../../library/functions/handler.function';
import { RecordStruttura } from '../../../../../../../../../library/interfaces/form.interface';
import { Ruolo } from '../../../../../../../../shared/enums/users.enum';
import { sottoscrizioneUtentiCustom } from '../../../../../../../../shared/handlers/auth.handler';
import {
  User,
  UserParams,
} from '../../../../../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../../../../../shared/services/api/auth.service';
import { converUserParams } from '../../../../../../functions/home.functions';
import { AdminLang } from '../../../languages/interfaces/admin-lang.interface';
import { GrigliaAdminComponent } from './components/griglia-admin.component';

@Component({
  selector: 'app-lista-admin',
  standalone: true,
  imports: [
    GrigliaAdminComponent,
    SpinnerComponent,
    ModalCustomComponent,
    FormCustomComponent,
  ],
  template: `
    @if (loadedAdmin()) {
      <app-griglia-admin
        [adminLang]="adminLang"
        [user]="user"
        [userMapByRuolo]="userMapByRuolo"
        (eliminaRuolo)="eliminaRuolo($event)"
        (modificaRuolo)="modificaRuolo($event)"
      ></app-griglia-admin>

      @if (editUser()) {
        <app-modal-custom
          [title]="adminLang.modifica"
          [showFooter]="true"
          [secondaryButtonText]="adminLang.annulla"
          [primaryButtonText]="adminLang.salva"
          (primaryAction)="onSave()"
          (secondaryAction)="editUser.set(null)"
          (close)="editUser.set(null)"
        >
          <div bodyModal>
            <app-form-custom
              [visualizzaPulsanti]="false"
              [strutturaForm]="strutturaForm"
            ></app-form-custom>
          </div>
        </app-modal-custom>
      }
    } @else {
      <app-spinner [mt]="'10rem'"></app-spinner>
    }
  `,
})
export class ListaAdminComponent implements OnInit {
  public authService = inject(AuthService);
  public router = inject(Router);

  public editUser = signal<UserParams | null>(null);
  public ruoli = Object.values(Ruolo);
  public userMap = signal<Record<string, UserParams[]>>({});
  public userMapByRuolo: Record<string, Signal<UserParams[]>> = {};
  public loadedAdmin = signal<boolean>(false);
  public strutturaForm: RecordStruttura = {};

  @Input() adminLang!: AdminLang;
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

  eliminaRuolo(user: UserParams): void {
    user.ruolo = Ruolo.user;

    handlerFunc<void>({
      callHttp: () => this.authService.updateRuoloUtente(user.id, Ruolo.user),
      nextCall: () => this.nextEditUser(user),
    });
  }

  modificaRuolo(user: UserParams): void {
    this.strutturaForm = {
      nome: {
        titolo: this.adminLang.nome,
        tipo: 'Text',
        validators: [],
        readonly: true,
        valueInit: user.nome,
      },
      ruolo: {
        titolo: this.adminLang.ruolo,
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
    this.editUser.set(null);
  }
}
