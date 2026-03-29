import {
  Component,
  EventEmitter,
  Input,
  Output,
  Signal,
  WritableSignal,
} from '@angular/core';
import {
  keyofMangaUtente,
  ListaManga,
} from '../../../../interfaces/manga.interface';
import { FormsModule } from '@angular/forms';
import { TuoiMangaLang } from '../languages/interfaces/tuoiManga-lang.interface';

@Component({
  selector: 'app-input-tuoi-manga',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="elemento-centrato mt-4 px-2" id="input-ricerca">
      <input
        type="text"
        class="form-control w-100 w-sm-75 w-md-50"
        [placeholder]="tuoiMangaLang.aggiungiManga + ' ' + selectedTab"
        [(ngModel)]="searchQuery"
        style="
      border-radius: 20px;
      padding-left: 40px;
      position: relative;
      font-size: clamp(0.9rem, 1.2vw, 1.1rem);
    "
      />

      <!-- Lista di risultati della ricerca (dropdown) -->
      @if (allMangaSearch().length > 0 && searchQuery().length > 0) {
        <div class="position-absolute lista-ricerca">
          <ul class="list-group stile-gruppo-lista" style="max-height: 200px;">
            @for (result of allMangaSearch(); track $index) {
              <li
                class="list-group-item elemento-centrato"
                style="cursor: pointer;"
                (click)="aggiungiMangaTab.emit(result.id)"
              >
                <img
                  [src]="result.copertina"
                  alt="manga copertina"
                  class="rounded-circle stile-immagine-profilo"
                />
                <span style="font-size: clamp(1.2rem, 1.5vw, 1.6rem)">{{
                  result.nome
                }}</span>
              </li>
            }
          </ul>
        </div>
      }
    </div>
  `,
  styles: [
    `
      #input-ricerca {
        .stile-gruppo-lista {
          border-radius: 20px;
          background-color: white;

          @media (max-width: 576px) {
            max-height: 200px;
          }

          @media (min-width: 577px) and (max-width: 992px) {
            max-height: 300px;
          }

          @media (min-width: 993px) {
            max-height: 400px;
          }
        }

        .lista-ricerca {
          z-index: 1050;
          margin-top: 2.6rem;
          width: 100%;
          max-width: 20rem;
        }

        .stile-immagine-profilo {
          width: 70px;
          height: 70px;
          object-fit: cover;
          margin-right: 10px;

          @media (min-width: 768px) {
            width: 70px;
            height: 70px;
          }
        }
      }
    `,
  ],
})
export class InputTuoiMangaComponent {
  @Input() tuoiMangaLang!: TuoiMangaLang;
  @Input() allMangaSearch!: Signal<ListaManga[]>;
  @Input() searchQuery!: WritableSignal<string>;
  @Input() selectedTab!: keyofMangaUtente;
  @Output() aggiungiMangaTab = new EventEmitter<number>();
}
