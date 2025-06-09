import { Injectable } from '@angular/core';
import { FormWizard } from '../interfaces/wizard.interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WizardService {
  private wizardForm: FormWizard = {} as FormWizard;
  private avantiStep2Premuto = new Subject();

  getWizardForm(): FormWizard {
    return this.wizardForm;
  }

  setWizardForm(form: FormWizard): void {
    this.wizardForm = form;
  }

  getAvantiStep2Premuto$(): Observable<any> {
    return this.avantiStep2Premuto.asObservable();
  }

  setAvantiStep2Premuto(): void {
    this.avantiStep2Premuto.next('');
  }
}
