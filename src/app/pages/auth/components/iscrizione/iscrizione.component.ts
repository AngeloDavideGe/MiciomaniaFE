import { Component, inject } from '@angular/core';
import { take } from 'rxjs';
import { DataHttp } from '../../../../core/api/http.data';
import { updateUserCustom } from '../../../../shared/handlers/auth.handler';
import {
  Iscrizione,
  User,
} from '../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../shared/services/api/auth.service';
import { Ruolo } from '../../../../shared/enums/users.enum';
import { FormWizard } from '../../interfaces/wizard.interface';
import { stepType, WizardBase } from './base/wizard.base';
import { iscrizione_imports } from './imports/iscrizione.import';

@Component({
  selector: 'app-iscrizione',
  standalone: true,
  imports: iscrizione_imports,
  templateUrl: './iscrizione.component.html',
  styleUrl: './iscrizione.component.scss',
})
export class IscrizioneComponent extends WizardBase {
  public user: User = {} as User;
  public caricaPersona: boolean = false;
  public viewSuccespage: boolean = true;
  public wizardData: FormWizard = {} as FormWizard;

  private authService = inject(AuthService);

  constructor() {
    super();
    this.iscrizioneUser();
  }

  iscrizioneUser(): void {
    this.user = DataHttp.user() ?? ({} as User);
    this.caricaPersona = true;
  }

  inviaIscrizione(): void {
    this.setUserPerInvio();

    updateUserCustom({
      authService: this.authService,
      user: this.user,
    })
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.setLocalStorage();
          this.nextCallIscrizione();
        },
        error: (err) =>
          this.errorUpdateUtente(err, 'Errore modifica dell utente'),
      });
  }

  private setUserPerInvio(): void {
    const wizardForm: FormWizard = this.wizardService.getWizardForm();
    const ruolo: Ruolo = this.user.credenziali.ruolo;
    const iscrizione: Iscrizione = {
      stato: wizardForm.stato,
      team: wizardForm.team,
      provincia: wizardForm.provincia + ' (' + wizardForm.regione + ')',
      citta: wizardForm.citta,
      punteggio: this.user.iscrizione.punteggio || 0,
    };

    this.user.iscrizione = iscrizione;
    this.user.credenziali.ruolo = ruolo == Ruolo.USER ? Ruolo.PLAYER : ruolo;
    this.loadingService.show();
  }

  private errorUpdateUtente(err: string, messaggio: string): void {
    console.error(messaggio, err);
    alert(messaggio);
  }

  override nextStep(): void {
    switch (this.currentStep()) {
      case 1:
        this.currentStep.update((x) => (x + 1) as stepType);
        break;
      case 2:
        if (this.formValido) {
          this.currentStep.update((x) => (x + 1) as stepType);
        } else {
          this.wizardService.setAvantiStep2Premuto();
        }
        break;
      case 3:
        if (this.lineeGuidaAccettate) {
          this.inviaIscrizione();
        }
        break;
    }
  }

  private setLocalStorage(): void {
    if (DataHttp.profiloPersonale) {
      DataHttp.profiloPersonale.user = this.user;
    }
  }

  private nextCallIscrizione(): void {
    this.loadingService.hide();
    this.wizardService.setWizardForm({} as FormWizard);

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/auth/iscrizione']);
    });
  }

  editInfo = () => {
    this.viewSuccespage = false;
  };
}
