import {
  Component,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { generiManga } from '../../constants/genere.constant';
import { MangaLang } from '../../languages/interfaces/manga-lang.interface';

@Component({
  selector: 'app-filtri-manga',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="row g-1 mb-2 p-2 overflow-hidden" style="width: 100%;">
      <!-- Dropdown -->
      <div class="col-12 col-md-4">
        <label
          for="dropdownSelect"
          class="form-label text-primary fw-bold"
          style="font-size: 1.1rem;"
          >{{ mangaLang.seleziona || 'Seleziona Genere' }}</label
        >
        <select
          class="form-select bg-light border-primary rounded-3 w-100"
          aria-label="Select an option"
          style="min-height: 44px; font-size: 1rem; max-width: 100%;"
          (change)="onGenreChange.emit($event)"
        >
          <option selected>{{ mangaLang.qualsiasi || 'Qualsiasi' }}</option>
          @for (genere of mangaGeneri; track $index) {
          <option [value]="genere">{{ genere }}</option>
          }
        </select>
      </div>

      <!-- Name Input -->
      <div class="col-12 col-md-4">
        <label
          for="nome"
          class="form-label text-danger fw-bold"
          style="font-size: 1.1rem;"
          >{{ mangaLang.cercaPerNome || 'Cerca per Nome' }}</label
        >
        <input
          type="text"
          class="form-control bg-light border-danger rounded-3 w-100"
          style="min-height: 44px; font-size: 1rem; max-width: 100%;"
          [placeholder]="mangaLang.cercaPerNome || 'Cerca per Nome'"
          [(ngModel)]="filterSelect.nome"
          (ngModelChange)="filterSelect.nome.set($event)"
        />
      </div>

      <!-- Author Input -->
      <div class="col-12 col-md-4">
        <label
          for="autore"
          class="form-label text-success fw-bold"
          style="font-size: 1.1rem;"
          >{{ mangaLang.cercaPerAutore || 'Cerca per Autore' }}</label
        >
        <input
          type="text"
          class="form-control bg-light border-success rounded-3 w-100"
          style="min-height: 44px; font-size: 1rem; max-width: 100%;"
          [placeholder]="mangaLang.cercaPerAutore || 'Cerca per Autore'"
          [(ngModel)]="filterSelect.autore"
          (ngModelChange)="filterSelect.autore.set($event)"
        />
      </div>
    </div>
  `,
})
export class FiltriMangaComponent {
  public mangaGeneri = generiManga;
  @Output() onGenreChange = new EventEmitter<Event>();
  @Input() mangaLang!: MangaLang;
  @Input() filterSelect!: {
    genere: WritableSignal<string>;
    autore: WritableSignal<string>;
    nome: WritableSignal<string>;
    tabBoolean: WritableSignal<boolean | null>;
  };
}
