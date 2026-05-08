import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { ICheckBox } from '../../../../../../../library/components/checkbox/checkbox.component';
import { FormCustomComponent } from '../../../../../../../library/components/form/form.component';
import { RecordStruttura } from '../../../../../../../library/interfaces/form.interface';
import { arrayNotEmptyValidator } from '../../../../../../../library/validators/checkbox.validator';
import { DataHttp } from '../../../../../../core/api/http.data';
import { StatoPersona } from '../../../../../../shared/enums/users.enum';
import { User } from '../../../../../../shared/interfaces/users.interface';
import { Provincia, Regione } from '../../../../interfaces/region.interface';
import { FormWizard } from '../../../../interfaces/wizard.interface';
import { WizardService } from '../../../../services/wizard.service';
import { regioniMock } from '../../constants/regioni.constant';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [FormCustomComponent],
  template: `<div
      class="card-header text-white text-center py-3 mb-2 gradient-header"
    >
      <h5 class="card-title mb-0">Modulo di Aggiornamento Profilo</h5>
    </div>

    <app-form-custom
      [strutturaForm]="formConfig"
      [visualizzaPulsanti]="false"
      (formValido)="formValido.emit($event)"
      (subscribeForm)="wizardService.setWizardForm($event)"
    ></app-form-custom>`,
  styles: `
    .gradient-header {
      background: linear-gradient(
        90deg,
        var(--primary-color),
        var(--primary-hover)
      );
      border-bottom: 3px solid rgba(255, 255, 255, 0.25); // Mantenuto effetto visivo

      .card-title {
        font-weight: 600;
        letter-spacing: 0.3px;
        color: var(--surface-color);
      }
    }
  `,
})
export class Step2Component implements OnInit, OnDestroy {
  public wizardService = inject(WizardService);
  public nomeUtente: string = '';
  public email: string = '';
  public formTeams: ICheckBox[] = [];
  public formConfig: RecordStruttura = {};

  @Input() team!: string[];
  @Output() formValido = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.inizializzaForm();
    this.associaUtenteFunc(DataHttp.user());
  }

  ngOnDestroy(): void {
    this.inviaForm(this.wizardService.getWizardForm());
  }

  private inizializzaForm(): void {
    const wizard = this.wizardService.getWizardForm();

    this.formConfig = {
      squadra: {
        titolo: 'Squadra',
        valueInit: wizard.squadra,
        validators: [arrayNotEmptyValidator()],
        tipo: 'Checkbox',
        checkbox: this.team.map((nome: string) => {
          return {
            testo: nome,
            id: nome,
          };
        }),
      },
      stato: {
        titolo: 'Stato',
        valueInit: wizard.stato,
        validators: [arrayNotEmptyValidator()],
        tipo: 'Select',
        optionsSelect: Object.values(StatoPersona),
      },
      regione: {
        titolo: 'Regione',
        valueInit: wizard.regione,
        validators: [Validators.required],
        tipo: 'Select',
        optionsSelect: regioniMock.map((x: Regione) => x.nome),
        onChange: (value: string) => {
          this.formConfig['provincia'].optionsSelect = this.getProvince(value);
        },
      },
      provincia: {
        titolo: 'Provincia',
        valueInit: wizard.provincia,
        validators: [Validators.required],
        tipo: 'Select',
        optionsSelect: this.getProvince(wizard.regione),
      },
    };
  }

  inviaForm(params: FormWizard): void {
    const wizardForm: FormWizard = {
      nome: this.nomeUtente,
      email: this.email,
      squadra: params.squadra || '',
      stato: (params.stato as StatoPersona) || StatoPersona.Deriso,
      regione: params.regione || '',
      provincia: params.provincia || '',
    };

    this.wizardService.setWizardForm(wizardForm);
  }

  private associaUtenteFunc(user: User | null): void {
    if (user) {
      this.associaUtente(user.credenziali.nome, user.credenziali.email);
    } else {
      this.associaUtente('', '');
    }
  }

  private associaUtente(nome: string, email: string): void {
    this.nomeUtente = nome;
    this.email = email;
  }

  private getProvince(nomeReg: string): string[] {
    const regione: Regione | undefined = regioniMock.find(
      (x: Regione) => x.nome == nomeReg,
    );

    if (regione) {
      return regione.province.map((y: Provincia) => y.nome);
    }

    return [];
  }
}
