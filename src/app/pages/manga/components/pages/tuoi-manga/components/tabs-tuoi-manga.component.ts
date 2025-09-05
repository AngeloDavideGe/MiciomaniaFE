import { Component, EventEmitter, Input, Output } from '@angular/core';
import { keyofMangaUtente } from '../../../../interfaces/manga.interface';
import { TuoiMangaLang } from '../languages/interfaces/tuoiManga-lang.interface';

@Component({
  selector: 'app-tabs-tuoi-manga',
  standalone: true,
  imports: [],
  template: `
    <div class="container mt-4" id="tabs">
      <div class="d-flex justify-content-center gap-3 flex-wrap">
        <button
          class="btn btn-lg py-2 px-4 fw-bold stile-bottoni"
          style="background-color: #ff4081"
          onmouseover="this.style.backgroundColor='#e91e63'"
          onmouseout="this.style.backgroundColor='#ff4081'"
          (click)="filterMangaFunc.emit('preferiti')"
          [disabled]="selectedTab == 'preferiti'"
        >
          ⭐ {{ tuoiMangaLang.preferiti }}
        </button>

        <button
          class="btn btn-lg py-2 px-4 fw-bold stile-bottoni"
          style="background-color: #ff9800"
          onmouseover="this.style.backgroundColor='#fb8c00'"
          onmouseout="this.style.backgroundColor='#ff9800'"
          (click)="filterMangaFunc.emit('letti')"
          [disabled]="selectedTab == 'letti'"
        >
          📖 {{ tuoiMangaLang.leggendo }}
        </button>

        <button
          class="btn btn-lg py-2 px-4 fw-bold stile-bottoni"
          style="background-color: #4caf50"
          onmouseover="this.style.backgroundColor='#43a047'"
          onmouseout="this.style.backgroundColor='#4caf50'"
          (click)="filterMangaFunc.emit('completati')"
          [disabled]="selectedTab == 'completati'"
        >
          ✅ {{ tuoiMangaLang.completati }}
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      #tabs .stile-bottoni {
        color: white;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transition: all 0.3s;
      }
    `,
  ],
})
export class TabsTuoiMangaComponent {
  @Input() tuoiMangaLang!: TuoiMangaLang;
  @Input() selectedTab!: keyofMangaUtente;
  @Output() filterMangaFunc = new EventEmitter<keyofMangaUtente>();
}
