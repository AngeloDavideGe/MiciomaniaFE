import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { DTO_Wizard } from '../interfaces/wizard.interface';
import { WizardService } from '../services/wizard.service';
import { LoadingService } from '../../../shared/services/loading.service';

export abstract class WizardCustom {
  protected currentStep: number;
  protected wizard: DTO_Wizard[];
  protected formValido: boolean;
  protected lineeGuidaAccettate: boolean;

  protected router = inject(Router);
  protected wizardService = inject(WizardService);
  protected loadingService = inject(LoadingService);

  constructor() {
    this.currentStep = 1;
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

  protected navigateToHome = () => {
    this.router.navigate(['/home']);
  };

  protected nextStep(): void {}

  protected prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
    } else {
      this.router.navigate(['home']);
    }
  }
}
