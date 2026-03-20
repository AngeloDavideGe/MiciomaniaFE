import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-checkbox-custom',
  standalone: true,
  imports: [],
  template: `
    @for (check of checks; track $index) {
      <div class="form-check mb-2">
        <input
          style="cursor: pointer;"
          type="checkbox"
          [id]="check.id + '-' + $index"
          class="form-check-input"
          [value]="check"
          [checked]="checked().includes(check.id)"
          (change)="onCheckChange($event, check.id)"
        />
        <label [for]="check.id + '-' + $index" class="form-check-label">
          <i class="bi bi-{{ check.icon }}"></i>
          {{ check.testo }}
        </label>
      </div>
    }
  `,
})
export class CheckBoxCustomComponent implements OnInit {
  @Input() checks!: ICheckBox[];
  @Input() tipo: 'single' | 'multiple' = 'single';
  @Input() initialChecked: string | null = null;

  @Output() checkChange = new EventEmitter<string>();
  @Output() allChacked = new EventEmitter<boolean>();

  public checked = signal<string[]>([]);

  ngOnInit(): void {
    if (this.initialChecked) {
      this.checked.set([this.initialChecked]);
    }
  }

  public onCheckChange(event: Event, id: string): void {
    const checkbox = event.target as HTMLInputElement;

    switch (this.tipo) {
      case 'single': {
        this.singleCheck(id, checkbox.checked);
        break;
      }
      case 'multiple': {
        this.multipleCheck(id, checkbox.checked);
        break;
      }
    }

    this.checkChange.emit(this.checked().join(', '));
    this.allChacked.emit(this.checked().length == this.checks.length);
  }

  private singleCheck(checkboxId: string, isChecked: boolean): void {
    if (isChecked) {
      this.checked.set([checkboxId]);
    } else {
      if (this.checked().includes(checkboxId)) {
        this.checked.set([]);
      }
    }
  }

  private multipleCheck(checkboxId: string, isChecked: boolean): void {
    if (isChecked) {
      if (!this.checked().includes(checkboxId)) {
        this.checked.update((current: string[]) => [...current, checkboxId]);
      }
    } else {
      this.checked.update((current: string[]) =>
        current.filter((id: string) => id !== checkboxId),
      );
    }
  }
}

export interface ICheckBox {
  testo: string;
  id: string;
  icon?: string;
}
