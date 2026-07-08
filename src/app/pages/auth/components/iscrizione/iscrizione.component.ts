import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { iTab } from '../../../../../library/components/tabs/tabs-indy.component';
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
import { iscrizione_imports } from './iscrizione.import';
import { RecordStrutturaMultiForm } from '../../../../../library/interfaces/form.interface';
import { handlerFunc } from '../../../../../library/functions/handler.function';
import { debounceTimeoutCustom } from '../../../../../library/functions/debounce.function';

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
  public user: User = structuredClone(DataHttp.user()!);

  public squadreInGame = computed<Squadre[]>(
    () => this.squadreService.classifica().squadre,
  );

  public strutturaForm = computed<RecordStrutturaMultiForm>(() =>
    getStrutturaForm(this.user, this.squadreInGame().map((s) => s.nome) || []),
  );

  public tabs: iTab[] = [
    {
      id: '1',
      label: 'Dati Personali',
    },
    {
      id: '2',
      label: 'Riepilogo',
    },
  ];

  public aggiornaUserForm: Function = debounceTimeoutCustom((user: any) => {
    this.user = {
      id: this.user.id,
      credenziali: {
        ...this.user.credenziali,
        ...user.credenziali,
      },
      iscrizione: {
        ...this.user.iscrizione,
        ...user.iscrizione,
      },
      profile: {
        ...this.user.profile,
        ...user.profile,
        social: (user.social ?? []).reduce(
          (acc: Record<string, string>, item: any) => {
            if (item?.titolo && item?.url) {
              acc[item.titolo] = item.url;
            }
            return acc;
          },
          {} as Record<string, string>,
        ),
      },
    };
  });

  public disableNext = computed<boolean>(() => {
    const current: string = this.currentStep();
    const formValido: boolean = this.formValido();
    const lineeGuidaAccettate: boolean = this.lineeGuidaAccettate();

    switch (current) {
      case '1':
        return !formValido;
      case '2':
        return !lineeGuidaAccettate;
      default:
        return false;
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
