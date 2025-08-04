import { Component, Input } from '@angular/core';
import { PulsantiManga } from '../interfaces/filtri.interface';

@Component({
  selector: 'app-dettagli-manga',
  standalone: true,
  imports: [],
  template: `
    <div class="container text-center">
      <h1 class="display-4 fw-bold mb-3">{{ titolo }}</h1>
      <p class="lead mb-4">
        {{ messaggio }}
      </p>
      <p class="h5" style="font-style: italic">
        {{ descrizione }}
      </p>
      <div class="d-flex justify-content-center gap-3 mt-4">
        @for (bottone of bottoni; track $index) {
        <button
          class="btn btn-light btn-lg"
          (click)="bottone.click()"
          [disabled]="bottone.disabled"
        >
          <i [class]="bottone.icona"></i>
          {{ bottone.titolo }}
        </button>
        }
      </div>
    </div>
  `,
})
export class DettagliMangaComponent {
  @Input() titolo!: string;
  @Input() messaggio!: string;
  @Input() descrizione!: string;
  @Input() bottoni!: PulsantiManga[];
}
