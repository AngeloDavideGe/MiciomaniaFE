import {
  Component,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { generiManga } from '../../constants/genere.constant';

@Component({
  selector: 'app-filtri-manga',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="row mb-4">
      <!-- Dropdown -->
      <div class="col-md-4">
        <label for="dropdownSelect" class="form-label text-primary fw-bold"
          >Seleziona Genere</label
        >
        <select
          id="dropdownSelect"
          class="form-select bg-light border-primary"
          aria-label="Select an option"
          (change)="onGenreChange.emit($event)"
        >
          <option selected>Qualsiasi</option>
          @for(genere of mangaGeneri; track $index){
          <option [value]="genere">
            {{ genere }}
          </option>
          }
        </select>
      </div>

      <!-- Name Input -->
      <div class="col-md-4">
        <label for="nome" class="form-label text-danger fw-bold"
          >Cerca per Nome</label
        >
        <input
          type="text"
          id="nome"
          class="form-control bg-light border-danger"
          placeholder="Cerca per Nome"
          [(ngModel)]="filterSelect.nome"
          (ngModelChange)="filterSelect.nome.set($event)"
        />
      </div>

      <!-- Author Input -->
      <div class="col-md-4">
        <label for="autore" class="form-label text-success fw-bold"
          >Cerca per Autore</label
        >
        <input
          type="text"
          id="autore"
          class="form-control bg-light border-success"
          placeholder="Cerca per Autore"
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
  @Input() filterSelect!: {
    genere: WritableSignal<string>;
    autore: WritableSignal<string>;
    nome: WritableSignal<string>;
    tabBoolean: WritableSignal<boolean | null>;
  };
}
