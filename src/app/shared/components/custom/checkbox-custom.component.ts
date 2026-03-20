import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-checkbox-custom',
  standalone: true,
  imports: [],
  template: `
    @for (check of checks; track check.id) {
      <div class="elemento-iniziale px-2 mb-2" style="--align-start: center">
        <input
          class="check-input-custom"
          type="checkbox"
          [id]="check.id"
          [value]="check"
          [checked]="checkRecord[check.id]()"
          (change)="onCheckChange($event, check.id)"
        />
        <label [for]="check.id" class="check-label-custom">
          @if (check.icon) {
            <i class="bi bi-{{ check.icon }}"></i>
          }
          {{ check.testo }}
        </label>
      </div>
    }
  `,
  styles: [
    `
      .check-input-custom {
        cursor: pointer;
        width: 1.2em;
        height: 1.2em;
      }

      .check-label-custom {
        font-weight: 600;
        color: var(--text-color);
        cursor: pointer;
        margin-left: 1rem;

        i {
          font-size: 1.1em;
          line-height: 1;
        }
      }
    `,
  ],
})
export class CheckBoxCustomComponent implements OnInit {
  @Input() checks!: ICheckBox[];
  @Input() initialChecked: string | null = null;
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

  public onCheckChange(event: Event, id: string): void {
    const checkbox = event.target as HTMLInputElement;

    switch (this.tipo) {
      case 'single': {
        if (checkbox.checked) {
          this.checks.forEach((check: ICheckBox) =>
            this.checkRecord[check.id].set(check.id == id),
          );
          this.checked = [id];
        } else {
          this.checkRecord[id].set(false);
          this.checked = [];
        }
        break;
      }
      case 'multiple': {
        this.checkRecord[id].set(checkbox.checked);
        this.checked = checkbox.checked
          ? [...this.checked, id]
          : this.checked.filter((item: string) => item !== id);
        break;
      }
    }

    this.checkChange.emit(this.checked.join(', '));
    this.allChecked.emit(this.checked.length == this.checks.length);
  }
}

export interface ICheckBox {
  testo: string;
  id: string;
  icon?: string;
}
