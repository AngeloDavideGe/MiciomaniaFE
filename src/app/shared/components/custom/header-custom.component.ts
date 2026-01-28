import { Component, Input } from '@angular/core';
import { DataHttp } from '../../../core/api/http.data';
import { Lingua } from '../../../shared/interfaces/http.interface';

@Component({
  selector: 'app-header-custom',
  standalone: true,
  imports: [],
  template: `
    <header class="container text-center">
      <h1 class="display-4 fw-bold mb-3">{{ titolo }}</h1>
      <p class="lead mb-4">
        {{ messaggio }}
      </p>
      <p class="h5" style="font-style: italic">
        {{ descrizione }}
      </p>
      <div class="d-flex justify-content-center gap-3 mt-4">
        @if (bottoni.length > 0) {
          @for (bottone of bottoni; track $index) {
            <button
              class="btn btn-light btn-lg"
              (click)="bottone.click()"
              [disabled]="bottone.disabled"
            >
              <i [class]="bottone.icona"></i>
              {{ bottone.titolo[lingua] }}
            </button>
          }
        }
      </div>
    </header>
  `,
})
export class HeaderCustomComponent {
  public lingua: Lingua = DataHttp.lingua();
  @Input() titolo!: string;
  @Input() messaggio!: string;
  @Input() descrizione!: string;
  @Input() bottoni!: PulsantiHeader[];
  @Input() colorTitle: string = 'text-dark';
}

export interface PulsantiHeader {
  click: Function;
  disabled: boolean;
  titolo: Record<Lingua, string>;
  icona: string;
}
