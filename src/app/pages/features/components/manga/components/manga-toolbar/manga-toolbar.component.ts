import { Component, input, model } from '@angular/core';
import { MangaToolbar } from '../../interfaces/manga.interface';
import { AbbreviateNumberPipe } from '../../../../../../../library/pipes/number-format.pipe';

@Component({
  selector: 'app-manga-toolbar',
  standalone: true,
  imports: [AbbreviateNumberPipe],
  template: `
    <div class="manga-top">
      <div class="stats">
        @for (stat of stats(); track stat.title) {
          <div class="stat-card">
            <i class="bi" [class]="stat.icon"></i>

            <div>
              <h4>{{ stat.value | abbreviateNumber }}</h4>
              <span>{{ stat.title }}</span>
            </div>
          </div>
        }
      </div>

      <div class="toolbar">
        <div class="search">
          <i class="bi bi-search"></i>
          <input
            type="text"
            placeholder="Cerca manga, autore, genere..."
            (input)="searchQuery.set($event.target.value)"
          />
        </div>
      </div>
    </div>
  `,
  styleUrl: './manga-toolbar.component.scss',
})
export class MangaToolbarComponent {
  public stats = input<MangaToolbar[]>();
  public searchQuery = model<string>('');
}
