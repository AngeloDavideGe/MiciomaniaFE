import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FormWizard } from '../interfaces/wizard.interface';

@Injectable({
  providedIn: 'root',
})
export class WizardService {
  private wizardForm: FormWizard = {} as FormWizard;

  getWizardForm(): FormWizard {
    return this.wizardForm;
  }

  setWizardForm(form: FormWizard): void {
    this.wizardForm = form;
  }
}
