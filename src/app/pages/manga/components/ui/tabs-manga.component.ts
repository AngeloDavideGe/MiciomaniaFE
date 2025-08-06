import { Component, Input } from '@angular/core';
import { TabsManga } from '../../interfaces/filtri.interface';

@Component({
  selector: 'app-tabs-manga',
  standalone: true,
  imports: [],
  template: `
    <ul class="nav nav-tabs">
      @for (tab of tabs; track $index) {
      <li class="nav-item">
        <a
          style="cursor: pointer;"
          class="nav-link {{ tab.class }}"
          [style.fontWeight]="'bold'"
          [style.color]="tab.color"
          (click)="tab.clickCall()"
          >{{ tab.testo }}</a
        >
      </li>
      }
    </ul>
  `,
})
export class TabsMangaComponent {
  @Input() tabs!: TabsManga[];
}
