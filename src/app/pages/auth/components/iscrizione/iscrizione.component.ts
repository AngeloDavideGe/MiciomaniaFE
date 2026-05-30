import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { iTab } from '../../../../../library/components/tabs/tabs.component';
import { DataHttp } from '../../../../core/api/http.data';
import { Ruolo } from '../../../../shared/enums/users.enum';
import { updateUserCustom } from '../../../../shared/handlers/auth.handler';
import { getSquadreInGame } from '../../../../shared/handlers/squadre.handler';
import { Squadre } from '../../../../shared/interfaces/squadre.interface';
import {
  Iscrizione,
  User,
} from '../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../shared/services/api/auth.service';
import { SquadreService } from '../../../../shared/services/api/squadre.service';
import { FormWizard } from '../../interfaces/wizard.interface';
import { WizardService } from '../../services/wizard.service';
import { iscrizione_imports } from './imports/iscrizione.import';

@Component({
  selector: 'app-iscrizione',
  standalone: true,
  imports: iscrizione_imports,
  templateUrl: './iscrizione.component.html',
})
export class IscrizioneComponent {
  private router = inject(Router);
  public wizardService = inject(WizardService);
  private squadreService = inject(SquadreService);
  private authService = inject(AuthService);

  public currentStep = signal<string>('1');
  public formValido = signal<boolean>(false);
  public lineeGuidaAccettate = signal<boolean>(false);
  public user: User = DataHttp.user() || ({} as User);
  public squadreInGame = signal<Squadre[]>([]);

  public tabs: iTab[] = [
    {
      id: '1',
      label: 'Descrizione',
      color: '#FF5733',
    },
    {
      id: '2',
      label: 'Dati personali',
      color: '#33C1FF',
    },
    {
      id: '3',
      label: 'Conferma iscrizione',
      color: '#75FF33',
    },
  ];

  public disableNext = computed<boolean>(() => {
    const current = this.currentStep();
    const formValido = this.formValido();
    const lineeGuidaAccettate = this.lineeGuidaAccettate();

    switch (current) {
      case '1':
        return false;
      case '2':
        return !formValido;
      default:
        return !lineeGuidaAccettate;
    }
  });

  public team = computed<string[]>(() =>
    this.squadreInGame().map((s) => s.nome),
  );

  constructor() {
    getSquadreInGame({
      squadreService: this.squadreService,
      nextCall: (squadre: Squadre[]) => this.squadreInGame.set(squadre),
    });

    effect(() => {
      this.currentStep();
      window.scrollTo({ top: 0, left: 0 });
    });
  }

  private inviaIscrizione(): void {
    this.setUserPerInvio();

    updateUserCustom({
      authService: this.authService,
      user: this.user,
      finalizeFunc: () => {},
      valueContext: true,
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
    this.user.credenziali.ruolo = ruolo == Ruolo.user ? Ruolo.player : ruolo;
  }

  private errorUpdateUtente(err: string, messaggio: string): void {
    console.error(messaggio, err);
    alert(messaggio);
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
