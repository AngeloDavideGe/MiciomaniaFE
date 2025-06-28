import { Component } from '@angular/core';
import { take } from 'rxjs';
import {
  Iscrizione,
  User,
} from '../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../shared/services/auth.service';
import { Ruolo } from '../../enums/users.enum';
import { FormWizard } from '../../interfaces/wizard.interface';
import { WizardCustom } from './custom/wizard-custom.class';
import { iscrizione_imports } from './imports/iscrizione.import';

@Component({
  selector: 'app-iscrizione',
  standalone: true,
  imports: iscrizione_imports,
  templateUrl: './iscrizione.component.html',
  styleUrl: './iscrizione.component.scss',
})
export class IscrizioneComponent extends WizardCustom {
  public user: User = {} as User;
  public caricaPersona: boolean = false;
  public viewSuccespage: boolean = true;
  public wizardData: FormWizard = {} as FormWizard;

  constructor(private authService: AuthService) {
    super();
    this.iscrizioneUser();
  }

  iscrizioneUser(): void {
    this.user = this.authService.user() ?? ({} as User);
    this.caricaPersona = true;
  }

  inviaIscrizione(): void {
    this.setUserPerInvio();

    this.authService
      .updateUser(this.user)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.setLocalStorage(this.user);
          this.nextCallIscrizione();
        },
        error: (err) => {
          this.errorUpdateUtente(err, 'Errore nella modifica dell utente');
        },
      });
  }

  private setUserPerInvio(): void {
    const wizardForm = this.wizardService.getWizardForm();
    const ruolo = this.user.credenziali.ruolo;
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
    switch (this.currentStep) {
      case 1:
        this.currentStep += 1;
        break;
      case 2:
        if (this.formValido) {
          this.currentStep += 1;
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

  private setLocalStorage(utente: User): void {
    localStorage.setItem('user', JSON.stringify(this.user));

    const pubblicazioniSession = sessionStorage.getItem('pubblicazioni');
    if (pubblicazioniSession) {
      const datiSession = JSON.parse(pubblicazioniSession);
      datiSession.user = utente;
      sessionStorage.setItem('pubblicazioni', JSON.stringify(datiSession));
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
