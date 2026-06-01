import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { ModalCustomComponent } from '../../../../../../../library/components/modal/modal.component';
import { handlerFunc } from '../../../../../../../library/functions/handler.function';
import { RecordStruttura } from '../../../../../../../library/interfaces/form.interface';
import { Ruolo } from '../../../../../../shared/enums/users.enum';
import { UserParams } from '../../../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../../../shared/services/api/auth.service';
import { CambioRuoloUtente } from '../interfaces/admin.interface';
import { AdminLang } from '../languages/interfaces/admin-lang.interface';
import { FormCustomComponent } from '../../../../../../../library/components/form/form.component';

@Component({
  selector: 'app-edit-admin',
  standalone: true,
  imports: [ModalCustomComponent, FormCustomComponent],
  template: `
    <app-modal-custom
      [title]="adminLang.modifica"
      [showFooter]="true"
      [secondaryButtonText]="adminLang.annulla"
      [primaryButtonText]="adminLang.salva"
      (primaryAction)="onSave()"
      (secondaryAction)="chiudiModale.emit()"
      (close)="chiudiModale.emit()"
    >
      <div bodyModal>
        <app-form-custom
          [visualizzaPulsanti]="false"
          [strutturaForm]="strutturaForm"
        ></app-form-custom>
      </div>
    </app-modal-custom>
  `,
})
export class EditAdminComponent implements OnInit {
  private authService = inject(AuthService);

  @Input() adminLang!: AdminLang;
  @Input() userEdit!: UserParams;
  @Output() chiudiModale = new EventEmitter<void>();
  @Output() ruoloModificato = new EventEmitter<CambioRuoloUtente>();

  public newRuolo: Ruolo = {} as Ruolo;

  public strutturaForm: RecordStruttura = {};

  ngOnInit(): void {
    this.newRuolo = this.userEdit.ruolo;

    this.strutturaForm = {
      nome: {
        titolo: this.adminLang.nome,
        tipo: 'Text',
        validators: [],
        readonly: true,
        valueInit: this.userEdit.nome,
      },
      ruolo: {
        titolo: this.adminLang.ruolo,
        validators: [Validators.required],
        tipo: 'Select',
        valueInit: this.userEdit.ruolo,
        errorMessage: 'Ruolo è obbligatorio',
        optionsSelect: Object.values(Ruolo),
        onChange: (x: any) => (this.newRuolo = x),
      },
    };
  }

  onSave() {
    if (this.newRuolo === this.userEdit.ruolo) {
      alert('Nessuna modifica apportata al ruolo.');
      return;
    }

    if (this.newRuolo === Ruolo.miciomane) {
      alert('Non puoi modificare il ruolo in Miciomane.');
      return;
    }

    handlerFunc<void>({
      callHttp: () =>
        this.authService.updateRuoloUtente(this.userEdit.id, this.newRuolo),
      nextCall: () => this.nextUpdateRuoloUtente(),
    });
  }

  private nextUpdateRuoloUtente() {
    const cambioRuoloUtente: CambioRuoloUtente = {
      id: this.userEdit.id,
      nuovoRuolo: this.newRuolo,
      vecchioRuolo: this.userEdit.ruolo,
    };
    this.ruoloModificato.emit(cambioRuoloUtente);
  }
}
