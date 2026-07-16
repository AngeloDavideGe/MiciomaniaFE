import {
  Component,
  input,
  output,
  signal,
  effect,
  OnInit,
  inject,
} from '@angular/core';
import { ButtonIndyComponent } from '../button/button-indy.component';
import { iTab } from '../../interfaces/tabs.interface';

@Component({
  selector: 'app-tabs-indy',
  standalone: true,
  imports: [ButtonIndyComponent],
  templateUrl: './tabs-indy.component.html',
  styleUrl: './tabs-indy.component.scss',
})
export class TabsIndyComponent {
  private defaultTabs: iTab[] = [
    {
      id: '1',
      icona: 'bi bi-grid',
    },
    {
      id: '2',
      icona: 'bi bi-list',
    },
  ];

  public tabs = input<iTab[]>(this.defaultTabs);
  public tipo = input<'tab' | 'wizard' | 'lista'>('tab');
  public disabledColor = input<string>('white');
  public disableNext = input<boolean>(false);
  public initialTab = input<string>('');

  public clickTab = output<string>();
  public prev = output<{ current: string; prev: string }>();
  public next = output<{ current: string; next: string }>();

  public selectTab = signal<string>('');

  constructor() {
    effect(() => {
      const tabs = this.tabs();
      const initial = this.initialTab();

      if (tabs.length > 0) {
        const found = tabs.find((tab) => tab.id === initial);
        this.selectTab.set(found ? initial : tabs[0].id);
      }
    });
  }

  public clickTabFunc(value: iTab): void {
    if (this.selectTab() !== value.id) {
      this.selectTab.set(value.id);
      this.clickTab.emit(value.id);
      value.azione?.(value.id);
    }
  }

  public prevStep(): void {
    const tabs = this.tabs();
    const currentIndex = tabs.findIndex((x) => x.id === this.selectTab());
    const prevTab = tabs[currentIndex - 1];

    if (prevTab) {
      this.prev.emit({ current: this.selectTab(), prev: prevTab.id });
      this.selectTab.set(prevTab.id);
      prevTab.azione?.(prevTab.id);
    } else {
      this.prev.emit({ current: this.selectTab(), prev: '' });
    }
  }

  public nextStep(): void {
    const tabs = this.tabs();
    const currentIndex = tabs.findIndex((x) => x.id === this.selectTab());
    const nextTab = tabs[currentIndex + 1];

    if (nextTab) {
      this.next.emit({ current: this.selectTab(), next: nextTab.id });
      this.selectTab.set(nextTab.id);
      nextTab.azione?.(nextTab.id);
    } else {
      this.next.emit({ current: this.selectTab(), next: '' });
    }
  }
}
