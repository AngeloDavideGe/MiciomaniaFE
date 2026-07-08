import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { ICheckBox } from '../../interfaces/form.interface';

@Component({
  selector: 'app-checkbox-indy',
  standalone: true,
  imports: [],
  templateUrl: './checkbox-indy.component.html',
  styleUrl: './checkbox-indy.component.scss',
})
export class CheckBoxIndyComponent implements OnInit {
  @Input() checks!: ICheckBox[];
  @Input() initialChecked?: string;
  @Input() tipo: 'single' | 'multiple' = 'single';

  @Output() checkChange = new EventEmitter<string>();
  @Output() allChecked = new EventEmitter<boolean>();

  public checked: string[] = [];
  public checkRecord: Record<string, WritableSignal<boolean>> = {};

  ngOnInit(): void {
    if (this.initialChecked) {
      this.checked = [this.initialChecked];
    }

    this.checks.forEach((check: ICheckBox) => {
      this.checkRecord[check.id] = signal(this.initialChecked == check.id);
    });
  }

  public onCheckChange(event: Event, check: ICheckBox): void {
    const checkbox = event.target as HTMLInputElement;

    switch (this.tipo) {
      case 'single': {
        if (checkbox.checked) {
          this.checks.forEach((checkFor: ICheckBox) =>
            this.checkRecord[checkFor.id].set(checkFor.id == check.id),
          );
          this.checked = [check.id];
          check.azioneCheck?.();
        } else {
          this.checkRecord[check.id].set(false);
          this.checked = [];
          check.azioneNoCheck?.();
        }
        break;
      }
      case 'multiple': {
        this.checkRecord[check.id].set(checkbox.checked);
        this.checked = checkbox.checked
          ? [...this.checked, check.id]
          : this.checked.filter((item: string) => item !== check.id);
        break;
      }
    }

    this.checkChange.emit(this.checked.join(', '));
    this.allChecked.emit(this.checked.length == this.checks.length);
  }
}
