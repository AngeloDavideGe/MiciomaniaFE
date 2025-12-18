import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { DataHttp } from '../../../../../../core/api/http.data';
import { StatoPersona } from '../../../../../../shared/enums/users.enum';
import { User } from '../../../../../../shared/interfaces/users.interface';
import { Provincia } from '../../../../interfaces/region.interface';
import { FormWizard } from '../../../../interfaces/wizard.interface';
import { WizardService } from '../../../../services/wizard.service';
import { arrayNotEmptyValidator } from '../../../../validators/checkbox.validator';
import {
  getProvinceByRegione,
  getRegioniMap,
} from '../../functions/region.function';
import { Step2Form } from '../../../../interfaces/auth-forms.interface';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
})
export class Step2Component implements OnInit, OnDestroy {
  public profileForm!: FormGroup<Step2Form>;
  private destroy$ = new Subject<void>();
  public statiPersona = Object.values(StatoPersona);
  public pulsantePremuto: boolean = false;
  public province: Provincia[] = [];
  public nomeUtente: string = '';
  public email: string = '';
  public regioni = getRegioniMap();

  @Input() team!: string[];
  @Output() formValido = new EventEmitter<boolean>();

  private fb = inject(FormBuilder);
  private wizardService = inject(WizardService);

  get f() {
    return this.profileForm.controls;
  }

  ngOnInit(): void {
    this.inizializzaForm();
    this.associaUtenteFunc(DataHttp.user());
  }

  ngAfterViewInit(): void {
    this.sottoscrizioneForm();
    this.pulsantePremutoFunc();
  }

  ngOnDestroy(): void {
    this.inviaForm();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private inizializzaForm(): void {
    const wizardFormData: FormWizard = this.wizardService.getWizardForm();

    if (wizardFormData.regione) {
      this.province = getProvinceByRegione(wizardFormData.regione);
    }

    this.profileForm = this.fb.group({
      squadra: [wizardFormData.squadra || '', arrayNotEmptyValidator()],
      stato: [wizardFormData.stato || '', Validators.required],
      regione: [wizardFormData.regione || '', Validators.required],
      provincia: [wizardFormData.provincia || '', Validators.required],
    });

    if (this.profileForm.get('regione')?.value === '') {
      this.profileForm.get('provincia')?.disable();
    }

    this.formValido.emit(this.profileForm.valid);
  }

  inviaForm(): void {
    const wizardForm: FormWizard = {
      nome: this.nomeUtente,
      email: this.email,
      squadra: this.profileForm.get('squadra')?.value || '',
      stato: this.profileForm.get('stato')?.value || StatoPersona.Deriso,
      regione: this.profileForm.get('regione')?.value || '',
      provincia: this.profileForm.get('provincia')?.value || '',
    };
    this.wizardService.setWizardForm(wizardForm);
  }

  onTeamChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;

    const teamControl = this.profileForm.get('squadra');
    if (checkbox.checked) {
      teamControl?.setValue(checkbox.value);
    } else {
      teamControl?.setValue('');
    }

    teamControl?.updateValueAndValidity();
  }

  onRegioneChange(event: any): void {
    const codiceRegione = event.target.value;
    const provinciaControl = this.profileForm.get('provincia');

    provinciaControl?.enable();
    provinciaControl?.setValue('');
    this.province = getProvinceByRegione(codiceRegione);
  }

  private associaUtenteFunc(user: User | null): void {
    if (user) {
      this.associaUtente(user.credenziali.nome, user.credenziali.email);
    } else {
      this.associaUtente('', '');
    }
  }

  private sottoscrizioneForm(): void {
    this.profileForm.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.profileForm.valid) {
          this.formValido.emit(true);
        } else {
          this.formValido.emit(false);
        }
        this.pulsantePremuto = false;
      });
  }

  private pulsantePremutoFunc(): void {
    this.wizardService
      .getAvantiStep2Premuto$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => (this.pulsantePremuto = true));
  }

  private associaUtente(nome: string, email: string): void {
    this.nomeUtente = nome;
    this.email = email;
  }

  onSubmit(): void {}
}
