import { Component, Input } from '@angular/core';
import { TabsManga } from '../../interfaces/filtri.interface';
import { Lingua } from '../../../../shared/interfaces/http.interface';
import { DataHttp } from '../../../../core/api/http.data';

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
            class="nav-link"
            [class]="tab.class"
            [style.fontWeight]="'bold'"
            [style.color]="tab.color"
            (click)="tab.clickCall()"
            >{{ tab.testo[lingua] }}</a
          >
        </li>
      }
    </ul>
  `,
  styles: [
    `
      .nav-tabs {
        --bs-nav-tabs-border-color: #ffffff;
        --bs-nav-tabs-link-active-border-color: revert;
      }
    `,
  ],
})
export class TabsMangaComponent {
  public lingua: Lingua = DataHttp.lingua();
  @Input() tabs!: TabsManga[];
}
