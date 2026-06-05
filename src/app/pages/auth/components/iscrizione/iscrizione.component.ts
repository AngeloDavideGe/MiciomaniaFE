import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { iTab } from '../../../../../library/components/tabs/tabs.component';
import { DataHttp } from '../../../../core/api/http.data';
import { updateUserCustom } from '../../../../shared/handlers/auth.handler';
import {
  Classifica,
  Squadre,
} from '../../../../shared/interfaces/squadre.interface';
import { User } from '../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../shared/services/api/auth.service';
import { SquadreService } from '../../../../shared/services/api/squadre.service';
import { getStrutturaForm } from './constants/iscrizione-form.constant';
import { iscrizione_imports } from './imports/iscrizione.import';
import { RecordStrutturaMultiForm } from '../../../../../library/interfaces/form.interface';
import { handlerFunc } from '../../../../../library/functions/handler.function';

@Component({
  selector: 'app-iscrizione',
  standalone: true,
  imports: iscrizione_imports,
  templateUrl: './iscrizione.component.html',
})
export class IscrizioneComponent {
  private router = inject(Router);
  private squadreService = inject(SquadreService);
  private authService = inject(AuthService);

  public currentStep = signal<string>('1');
  public formValido = signal<boolean>(false);
  public lineeGuidaAccettate = signal<boolean>(false);
  public user: User = DataHttp.user()!;
  public strutturaForm: RecordStrutturaMultiForm =
    {} as RecordStrutturaMultiForm;
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
    const current: string = this.currentStep();
    const formValido: boolean = this.formValido();
    const lineeGuidaAccettate: boolean = this.lineeGuidaAccettate();

    switch (current) {
      case '1':
        return false;
      case '2':
        return !formValido;
      default:
        return !lineeGuidaAccettate;
    }
  });

  constructor() {
    this.loadSquadre();

    effect(() => {
      this.currentStep();
      window.scrollTo({ top: 0, left: 0 });
    });
  }

  private loadSquadre(): void {
    handlerFunc<Classifica>({
      skipCall: this.squadreService.classificaLoaded,
      callHttp: () => this.squadreService.getClassifica(),
      nextCall: (data: Classifica) => this.squadreService.classifica.set(data),
      errorCall: () => (this.squadreService.classificaLoaded = false),
    });

    this.squadreService.classificaLoaded = true;
  }

  private invaIscrizione(): void {
    updateUserCustom({
      authService: this.authService,
      user: this.user,
      finalizeFunc: () => {},
      valueContext: true,
    }).subscribe({
      next: () => {},
      error: (err) =>
        console.error("Errore durante l'invio dell'iscrizione:", err),
    });
  }

  public prevStep(tabs: { current: string; prev: string }): void {
    if (tabs.current === '1') {
      this.router.navigate(['/home']);
    } else {
      this.currentStep.set(tabs.prev);
    }
  }

  public nextStep(tabs: { current: string; next: string }): void {
    if (tabs.current === '3') {
      this.invaIscrizione();
      this.router.navigate(['/home']);
    } else {
      this.currentStep.set(tabs.next);
    }
  }
}
