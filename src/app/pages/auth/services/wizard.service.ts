import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { BaseService } from '../../../shared/services/base/base.service';
import { FormWizard } from '../interfaces/wizard.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WizardService extends BaseService {
  private wizardForm: FormWizard = {} as FormWizard;
  private avantiStep2Premuto = new Subject();
  public descrizioniSquadre: string[] = [];

  constructor() {
    super('BE_CS');
  }

  getDescrizioniSquadre(): Observable<string[]> {
    return this.descrizioniSquadre.length > 0
      ? of(this.descrizioniSquadre)
      : this.getCustom<string[]>(
          'Iscrizione/get_descrizioni_squadre',
          {} as HttpParams
        );
  }

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
