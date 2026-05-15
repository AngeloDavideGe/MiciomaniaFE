import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-tabs-custom',
  standalone: true,
  imports: [],
  template: `
    <nav class="nav nav-tabs border-bottom-0">
      @for (tab of tabs; track tab.id) {
        <button
          class="nav-link me-2 px-3 py-2"
          (click)="clickTabFunc(tab)"
          [style.color]="selectTab() === tab.id ? tab.color : 'black'"
          [style.border-bottom]="
            selectTab() === tab.id
              ? '2px solid ' + tab.color
              : '2px solid transparent'
          "
        >
          {{ tab.label }}
        </button>
      }
    </nav>

    <div class="tab-content">
      <ng-content select="[tabContent]"></ng-content>
    </div>
  `,
})
export class TabsComponent implements OnInit {
  public selectTab = signal<string>('');

  @Input() tabs!: iTab[];
  @Output() clickTab = new EventEmitter<string>();

  ngOnInit(): void {
    this.selectTab.set(this.tabs[0].id);
  }

  public clickTabFunc(value: iTab): void {
    if (this.selectTab() != value.id) {
      this.selectTab.set(value.id);
      this.clickTab.emit(value.id);
      value.azione?.(value.id);
    }
  }
}

export interface iTab {
  id: string;
  label: string;
  color: string;
  azione?: (id?: string) => void;
}
