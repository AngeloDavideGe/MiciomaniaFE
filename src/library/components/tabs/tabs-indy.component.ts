import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { ButtonIndyComponent } from '../button/botton-indy.component';

@Component({
  selector: 'app-tabs-indy',
  standalone: true,
  imports: [ButtonIndyComponent],
  templateUrl: './tabs-indy.component.html',
  styleUrl: './tabs-indy.component.scss',
})
export class TabsIndyComponent implements OnInit {
  public selectTab = signal<string>('');

  @Input() tabs: iTab[] = [];
  @Input() tipo: 'tab' | 'wizard' | 'lista' = 'tab';
  @Input() disableNext: boolean = false;

  @Output() clickTab = new EventEmitter<string>();
  @Output() prev = new EventEmitter<{ current: string; prev: string }>();
  @Output() next = new EventEmitter<{ current: string; next: string }>();

  ngOnInit(): void {
    if (this.tabs.length == 0) {
      this.tabs = [
        {
          id: '1',
          icona: 'bi bi-grid',
        },
        {
          id: '2',
          icona: 'bi bi-list',
        },
      ];
    }

    this.selectTab.set(this.tabs[0].id);
  }

  public clickTabFunc(value: iTab): void {
    if (this.selectTab() != value.id) {
      this.selectTab.set(value.id);
      this.clickTab.emit(value.id);
      value.azione?.(value.id);
    }
  }

  public prevStep(): void {
    const index: number = this.tabs.findIndex((x) => x.id === this.selectTab());
    const prev: string = this.tabs[index - 1]?.id || '';

    this.prev.emit({ current: this.selectTab(), prev: prev });

    if (prev) {
      this.selectTab.set(prev);
      this.tabs[index - 1].azione?.(prev);
    }
  }

  public nextStep(): void {
    const index = this.tabs.findIndex((x) => x.id === this.selectTab());
    const next: string = this.tabs[index + 1]?.id || '';

    this.next.emit({ current: this.selectTab(), next: next });

    if (next) {
      this.selectTab.set(next);
      this.tabs[index + 1].azione?.(next);
    }
  }
}

export interface iTab {
  id: string;
  label?: string;
  color?: string;
  icona?: string;
  azione?: (id?: string) => void;
}
