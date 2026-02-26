import { Component, computed, Input, WritableSignal } from '@angular/core';
import { FiltriInterface } from '../../utilities/pagination.utilities';

@Component({
  selector: 'app-paginazione-custom',
  standalone: true,
  imports: [],
  template: `
    @if (filtri.totalPage() > 1) {
      <div class="pagination-container">
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

          @switch (tipo) {
            @case ('singolo') {
              <div class="page-indicator">
                <span class="current-page">{{ currentPage() }}</span>
                <span class="separator">/</span>
                <span class="total-pages">{{ filtri.totalPage() }}</span>
              </div>
            }
            @case ('multiplo') {
              <div class="page-indicator">
                @if (pagineVisibili()[0] > 1) {
                  <span class="ellipsis">...</span>
                }
                @for (page of pagineVisibili(); track $index) {
                  <button
                    class="page-btn"
                    (click)="filtri.selectPage(page)"
                    [class.active]="currentPage() === page"
                    aria-label="Pagina {{ page }}"
                  >
                    {{ page }}
                  </button>
                }
                @if (
                  pagineVisibili()[pagineVisibili().length - 1] <
                  filtri.totalPage()
                ) {
                  <span class="ellipsis">...</span>
                }
              </div>
            }
          }

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
      </div>
    }
  `,
  styleUrl: '../styles/pagination-custom.scss',
})
export class PaginazioneCustomComponent<T> {
  @Input() filtri!: FiltriInterface<T>;
  @Input() currentPage!: WritableSignal<number>;
  @Input() tipo: TipoPaginazione = 'multiplo';
  @Input() maxNumberPage: number = 4;

  public pagineVisibili = computed<number[]>(() => {
    const allPages: number[] = this.filtri.arrayPage();
    const currentIndex: number = this.currentPage() - 1;
    const lastIndex: number = this.filtri.totalPage() - 1;
    const half: number = Math.floor(this.maxNumberPage / 2);

    let startIdx: number = currentIndex - half;
    let endIdx: number = currentIndex + half;

    if (startIdx < 0) {
      startIdx = 0;
      endIdx = Math.min(lastIndex, startIdx + this.maxNumberPage - 1);
    }

    if (endIdx > lastIndex) {
      endIdx = lastIndex;
      startIdx = Math.max(0, endIdx - this.maxNumberPage + 1);
    }

    return allPages.slice(startIdx, endIdx + 1);
  });
}

export type TipoPaginazione = 'singolo' | 'multiplo';
