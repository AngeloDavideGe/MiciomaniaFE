import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
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
import { AuthCustom } from '../../../../shared/custom/auth-custom.class';
import { StatoPersona } from '../../../auth/enums/users.enum';
import { User } from '../../../../shared/interfaces/users.interface';
import { Region } from '../../class/region.class';
import { Provincia } from '../../interfaces/region.interface';
import { FormWizard } from '../../interfaces/wizard.interface';
import { WizardService } from '../../services/wizard.service';
import { arrayNotEmptyValidator } from '../../validators/checkbox.validator';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgClass, NgIf],
  templateUrl: './step2.component.html',
})
export class Step2Component extends AuthCustom implements OnInit, OnDestroy {
  public profileForm!: FormGroup;
  private destroy$ = new Subject<void>();
  public statiPersona = Object.values(StatoPersona);
  public team = environment.team;
  public pulsantePremuto: boolean = false;
  public province: Provincia[] = [];
  public nomeUtente: string = '';
  public email: string = '';
  public regionClass = new Region();

  @Output() formValido = new EventEmitter<boolean>();

  private fb = inject(FormBuilder);
  private wizardService = inject(WizardService);

  get f() {
    return this.profileForm.controls;
  }

  ngOnInit(): void {
    this.inizializzaForm();
    this.sottoscrizioneUtente({
      userFunc: (user) => this.associaUtenteFunc(user),
      destroy$: this.destroy$,
    });
    this.sottoscrizioneForm();
    this.pulsantePremutoFunc();

    this.profileForm.get('team')?.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.inviaForm();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private inizializzaForm(): void {
    const wizardFormData = this.wizardService.getWizardForm();
    this.profileForm = this.fb.group({
      team: [[], arrayNotEmptyValidator()],
      stato: [wizardFormData.stato || '', Validators.required],
      regione: [/*wizardFormData.regione || */ '', Validators.required],
      provincia: [/*wizardFormData.provincia || */ '', Validators.required],
      citta: [wizardFormData.citta || '', Validators.required],
    });
  }

  inviaForm(): void {
    const wizardForm: FormWizard = {
      nome: this.nomeUtente,
      email: this.email,
      team: this.profileForm.get('team')?.value.join(', ') || '',
      stato: this.profileForm.get('stato')?.value || '',
      regione: this.profileForm.get('regione')?.value || '',
      provincia: this.profileForm.get('provincia')?.value || '',
      citta: this.profileForm.get('citta')?.value || '',
    };
    this.wizardService.setWizardForm(wizardForm);
  }

  onTeamChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const selectedTeam: string[] = this.profileForm.get('team')?.value || [];

    if (checkbox.checked) {
      if (!selectedTeam.includes(checkbox.value)) {
        selectedTeam.push(checkbox.value);
      }
    } else {
      const index = selectedTeam.indexOf(checkbox.value);
      if (index > -1) {
        selectedTeam.splice(index, 1);
      }
    }

    const teamControl = this.profileForm.get('team');
    teamControl?.setValue([...selectedTeam]);
    teamControl?.updateValueAndValidity();
  }

  onRegioneChange(event: any): void {
    const codiceRegione = event.target.value;
    this.province = this.regionClass.getProvinceByRegione(codiceRegione);
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
      .subscribe(() => {
        this.pulsantePremuto = true;
      });
  }

  private associaUtente(nome: string, email: string): void {
    this.nomeUtente = nome;
    this.email = email;
  }

  onSubmit(): void {}
}
