import {
  Component,
  EventEmitter,
  Input,
  Output,
  Signal,
  WritableSignal,
} from '@angular/core';
import { FiltriInterface } from '../../utilities/pagination.utilities';

@Component({
  selector: 'app-paginazione-custom',
  standalone: true,
  imports: [],
  template: `
    <div class="pagination-controls">
      <button
        class="pagination-btn prev-btn"
        (click)="filtri.previousPage()"
        [disabled]="currentPage() === 1"
        [class.disabled]="currentPage() === 1"
        aria-label="Pagina precedente"
      >
        <i class="bi bi-chevron-left"></i>
      </button>

      <div class="page-indicator">
        <span class="current-page">{{ currentPage() }}</span>
        <span class="separator">/</span>
        <span class="total-pages">{{ filtri.totalPage() }}</span>
      </div>

      <button
        class="pagination-btn next-btn"
        (click)="filtri.nextPage()"
        [disabled]="currentPage() === filtri.totalPage()"
        [class.disabled]="currentPage() === filtri.totalPage()"
        aria-label="Pagina successiva"
      >
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  `,
  styleUrl: '../styles/pagination-custom.scss',
})
export class PaginazioneCustomComponent<T> {
  @Input() filtri!: FiltriInterface<T>;
  @Input() currentPage!: WritableSignal<number>;
}
