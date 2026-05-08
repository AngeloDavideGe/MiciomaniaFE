import {
  Component,
  effect,
  EventEmitter,
  inject,
  Output,
  signal,
} from '@angular/core';

import {
  CheckBoxCustomComponent,
  ICheckBox,
} from '../../../../../../../library/components/checkbox/checkbox.component';
import { FormWizard } from '../../../../interfaces/wizard.interface';
import { WizardService } from '../../../../services/wizard.service';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CheckBoxCustomComponent],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss',
})
export class Step3Component {
  private wizardService = inject(WizardService);

  public lineeGuidaAccettate = signal<boolean>(false);
  public wizardData: FormWizard = this.wizardService.getWizardForm();

  public lineeGuida: ICheckBox[] = [
    {
      testo:
        'Seguire le pratiche di sicurezza per proteggere i dati sensibili.',
      id: 'sicurezza',
    },
    {
      testo: 'Garantire l’accessibilità e l’usabilità dei servizi digitali.',
      id: 'accessibilita',
    },
    {
      testo: 'Mantenere una comunicazione chiara e tempestiva con il team.',
      id: 'comunicazione',
    },
  ];

  @Output() lineeGuidaEvent = new EventEmitter<boolean>();

  constructor() {
    effect(() => this.lineeGuidaEvent.emit(this.lineeGuidaAccettate()));
  }
}
