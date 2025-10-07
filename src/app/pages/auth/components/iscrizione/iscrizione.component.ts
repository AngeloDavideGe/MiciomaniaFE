import { Component } from '@angular/core';
import { DataHttp } from '../../../../core/api/http.data';
import { Ruolo } from '../../../../shared/enums/users.enum';
import { updateUserCustom } from '../../../../shared/handlers/auth.handler';
import {
  Iscrizione,
  User,
} from '../../../../shared/interfaces/users.interface';
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
  constructor() {
    super();
    this.iscrizioneUser();
  }

  private iscrizioneUser(): void {
    this.user = DataHttp.user() ?? ({} as User);
    this.caricaPersona = true;
  }

  private inviaIscrizione(): void {
    this.setUserPerInvio();

    updateUserCustom({
      authService: this.authService,
      user: this.user,
      finalizeFunc: () => this.loadingService.hide(),
    }).subscribe({
      next: () => this.nextCallIscrizione(),
      error: (err) =>
        this.errorUpdateUtente(err, 'Errore modifica dell utente'),
    });
  }

  private setUserPerInvio(): void {
    const wizardForm: FormWizard = this.wizardService.getWizardForm();
    const ruolo: Ruolo = this.user.credenziali.ruolo;
    const iscrizione: Iscrizione = {
      stato: wizardForm.stato,
      squadra: wizardForm.squadra,
      provincia: wizardForm.provincia + ' (' + wizardForm.regione + ')',
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

  private nextCallIscrizione(): void {
    this.wizardService.setWizardForm({} as FormWizard);

    if (DataHttp.profiloPersonale) {
      DataHttp.profiloPersonale.user = this.user;
    }

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/auth/iscrizione']);
    });
  }
}
