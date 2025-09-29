import {
  Component,
  effect,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { FormWizard } from '../../../../interfaces/wizard.interface';
import { LineeGuidaComponent } from './components/linee-guida.component';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [LineeGuidaComponent],
  templateUrl: './step3.component.html',
})
export class Step3Component {
  public lineeGuidaAccettate = signal<boolean>(false);

  @Input() wizardData: FormWizard | null = null;
  @Output() lineeGuidaEvent = new EventEmitter<boolean>();

  constructor() {
    effect(() => this.lineeGuidaEvent.emit(this.lineeGuidaAccettate()));
  }
}
