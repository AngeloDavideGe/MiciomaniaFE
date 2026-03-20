import {
  Component,
  effect,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import {
  CheckBoxCustomComponent,
  ICheckBox,
} from '../../../../../../shared/components/custom/checkbox-custom.component';
import { FormWizard } from '../../../../interfaces/wizard.interface';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CheckBoxCustomComponent],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss',
})
export class Step3Component {
  public lineeGuidaAccettate = signal<boolean>(false);

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

  @Input() wizardData: FormWizard | null = null;
  @Output() lineeGuidaEvent = new EventEmitter<boolean>();

  constructor() {
    effect(() => this.lineeGuidaEvent.emit(this.lineeGuidaAccettate()));
  }
}
