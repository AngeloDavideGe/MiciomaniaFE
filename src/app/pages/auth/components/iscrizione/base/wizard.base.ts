import { effect, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { DTO_Wizard, FormWizard } from '../../../interfaces/wizard.interface';
import { WizardService } from '../../../services/wizard.service';
import { LoadingService } from '../../../../../shared/services/template/loading.service';
import { User } from '../../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../../shared/services/api/auth.service';

export type stepType = 1 | 2 | 3;

export abstract class WizardBase {
  protected router = inject(Router);
  protected authService = inject(AuthService);
  protected wizardService = inject(WizardService);
  protected loadingService = inject(LoadingService);

  protected currentStep: WritableSignal<stepType>;
  protected wizard: DTO_Wizard[];
  protected formValido: boolean;
  protected lineeGuidaAccettate: boolean;

  public user: User = {} as User;
  public caricaPersona: boolean = false;
  public viewSuccespage: boolean = true;
  public wizardData: FormWizard = {} as FormWizard;

  constructor() {
    this.scrollTopNextStep();
    this.currentStep = signal<stepType>(1);
    this.formValido = false;
    this.lineeGuidaAccettate = false;
    this.wizard = [
      {
        step: 1,
        titolo: 'Introduzione',
      },
      {
        step: 2,
        titolo: 'Iscrizione',
      },
      {
        step: 3,
        titolo: 'Conferma',
      },
    ];
  }

  private scrollTopNextStep(): void {
    effect(() => {
      this.currentStep();
      window.scrollTo({ top: 0, left: 0 });
    });
  }

  protected navigateToHome = () => {
    this.router.navigate(['/home']);
  };

  protected nextStep(): void {}

  protected prevStep(): void {
    const step: stepType = this.currentStep();
    if (step > 1) {
      this.currentStep.update((x) => (x - 1) as stepType);
    } else {
      this.router.navigate(['home']);
    }
  }
}
