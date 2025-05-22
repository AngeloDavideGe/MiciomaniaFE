import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TabsManga } from '../interfaces/filtri.interface';

@Component({
  selector: 'app-tabs-manga',
  standalone: true,
  imports: [NgFor],
  template: `
    <ul class="nav nav-tabs" style="margin-bottom: 20px">
      <ng-container *ngFor="let tab of tabs">
        <li class="nav-item">
          <a
            class="nav-link {{ tab.class }}"
            data-bs-toggle="tab"
            [href]="tab.href"
            [style.fontWeight]="'bold'"
            [style.color]="tab.color"
            (click)="tab.clickCall()"
            >{{ tab.testo }}</a
          >
        </li>
      </ng-container>
    </ul>
  `,
  styles: [``],
})
export class TabsMangaComponent {
  @Input() tabs!: TabsManga[];
}
