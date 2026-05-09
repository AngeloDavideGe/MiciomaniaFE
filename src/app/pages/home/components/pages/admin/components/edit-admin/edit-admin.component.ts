import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { handlerFunc } from '../../../../../../../../library/functions/handler.function';
import { CapitalizeFirstLetterPipe } from '../../../../../../../../library/pipes/capitalize.pipe';
import { Ruolo } from '../../../../../../../shared/enums/users.enum';
import { UserParams } from '../../../../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../../../../shared/services/api/auth.service';
import { LoadingService } from '../../../../../../../shared/services/template/loading.service';
import { CambioRuoloUtente } from '../../interfaces/admin.interface';
import { AdminLang } from '../../languages/interfaces/admin-lang.interface';

@Component({
  selector: 'app-edit-admin',
  standalone: true,
  imports: [FormsModule, CapitalizeFirstLetterPipe],
  template: `
    <div
      class="modal"
      tabindex="-1"
      role="dialog"
      style="display: block; background-color: rgba(0, 0, 0, 0.5);"
    >
      <div
        class="modal-dialog"
        role="document"
        style="margin: 5% auto; max-width: 500px;"
      >
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header elementi-laterali border-bottom-0 pb-0">
            <h5 class="modal-title mb-0">
              {{ adminLang.modifica }}
            </h5>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              style="font-size: 1.2rem;"
              (click)="chiudiModale.emit()"
            ></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body pt-0 mt-2">
            <div class="mb-3">
              <label for="nome" class="form-label">{{ adminLang.nome }}</label>
              <input
                type="text"
                id="nome"
                class="form-control"
                [value]="userEdit.nome"
                readonly
              />
            </div>
            <div class="mb-3">
              <label for="ruolo" class="form-label">{{
                adminLang.ruolo
              }}</label>
              <select id="ruolo" class="form-select" [(ngModel)]="newRuolo">
                @for (r of availableRoles; track $index) {
                  <option [value]="r">
                    {{ r | capitalizeFirstLetter }}
                  </option>
                }
              </select>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer border-top-0 pt-0">
            <button
              type="button"
              class="btn btn-secondary"
              (click)="chiudiModale.emit()"
            >
              {{ adminLang.annulla }}
            </button>
            <button type="button" class="btn btn-primary" (click)="onSave()">
              {{ adminLang.salva }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class EditAdminComponent implements OnInit {
  private authService = inject(AuthService);
  private loadingService = inject(LoadingService);

  @Input() adminLang!: AdminLang;
  @Input() userEdit!: UserParams;
  @Output() chiudiModale = new EventEmitter<void>();
  @Output() ruoloModificato = new EventEmitter<CambioRuoloUtente>();

  public newRuolo: Ruolo = {} as Ruolo;
  public availableRoles: string[] = Object.values(Ruolo);

  ngOnInit(): void {
    this.newRuolo = this.userEdit.ruolo;
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

    this.loadingService.show();

    handlerFunc<void>({
      callHttp: () =>
        this.authService.updateRuoloUtente(this.userEdit.id, this.newRuolo),
      finalizeCall: () => this.loadingService.hide(),
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
