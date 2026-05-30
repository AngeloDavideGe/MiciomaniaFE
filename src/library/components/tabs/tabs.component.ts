import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { ButtonCustomComponent } from '../button/botton-custom.component';

@Component({
  selector: 'app-tabs-custom',
  standalone: true,
  imports: [ButtonCustomComponent],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent implements OnInit {
  public selectTab = signal<string>('');

  @Input() tabs!: iTab[];
  @Input() tipo: 'tab' | 'wizard' = 'tab';
  @Input() disableNext: boolean = false;

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

  public prevStep(): void {
    const index = this.tabs.findIndex((x) => x.id === this.selectTab());
    if (index > 0) {
      this.selectTab.set(this.tabs[index - 1].id);
      this.clickTab.emit(this.tabs[index - 1].id);
      this.tabs[index - 1].azione?.(this.tabs[index - 1].id);
    }
  }

  public nextStep(): void {
    const index = this.tabs.findIndex((x) => x.id === this.selectTab());
    if (index < this.tabs.length - 1) {
      this.selectTab.set(this.tabs[index + 1].id);
      this.clickTab.emit(this.tabs[index + 1].id);
      this.tabs[index + 1].azione?.(this.tabs[index + 1].id);
    }
  }
}

export interface iTab {
  id: string;
  label: string;
  color: string;
  azione?: (id?: string) => void;
}
