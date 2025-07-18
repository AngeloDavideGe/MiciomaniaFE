import { NgClass } from '@angular/common';
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
import { environment } from '../../../../../../../environments/environment';
import { AuthHandler } from '../../../../../../shared/handlers/auth.handler';
import { User } from '../../../../../../shared/interfaces/users.interface';
import { StatoPersona } from '../../../../enums/users.enum';
import { Provincia } from '../../../../interfaces/region.interface';
import { FormWizard } from '../../../../interfaces/wizard.interface';
import { WizardService } from '../../../../services/wizard.service';
import { arrayNotEmptyValidator } from '../../../../validators/checkbox.validator';
import { Region } from '../../class/region.class';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './step2.component.html',
})
export class Step2Component implements OnInit, OnDestroy {
  public profileForm!: FormGroup;
  private regionClass = new Region();
  private destroy$ = new Subject<void>();
  public statiPersona = Object.values(StatoPersona);
  public team = environment.team;
  public pulsantePremuto: boolean = false;
  public province: Provincia[] = [];
  public nomeUtente: string = '';
  public email: string = '';
  public regioni = this.regionClass.getRegioniMap();

  @Output() formValido = new EventEmitter<boolean>();

  private fb = inject(FormBuilder);
  private wizardService = inject(WizardService);
  private atuthHandler = inject(AuthHandler);

  get f() {
    return this.profileForm.controls;
  }

  ngOnInit(): void {
    this.inizializzaForm();
    this.associaUtenteFunc(this.atuthHandler.user());

    this.profileForm.get('team')?.updateValueAndValidity();
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
      const index: number = selectedTeam.indexOf(checkbox.value);
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
      .subscribe(() => (this.pulsantePremuto = true));
  }

  private associaUtente(nome: string, email: string): void {
    this.nomeUtente = nome;
    this.email = email;
  }

  onSubmit(): void {}
}
