import { Component, computed, Input, Signal, signal } from '@angular/core';
import { CapitalizeFirstLetterPipe } from '../../pipes/capitalize.pipe';

@Component({
  selector: 'app-table-custom',
  standalone: true,
  imports: [CapitalizeFirstLetterPipe],
  template: `
    <div [style]="{ width: lunghezzaTotale }">
      @if (elemTable().length > 0) {
        <div class="table-wrapper">
          @if (titoloTabella) {
            <div class="table-header">
              <div class="header-content">
                <i class="bi bi-table header-icon"></i>
                <h3 class="header-title">
                  {{ titoloTabella | capitalizeFirstLetter }}
                </h3>
                <div class="header-info">
                  <span class="total-items">
                    <i class="bi bi-list-ol me-1"></i>
                    {{ elemTable().length }} elementi
                  </span>
                </div>
              </div>
            </div>
          }

          <div class="table-container">
            <table class="table-custom">
              <thead>
                <tr>
                  @for (key of keyofElem; track $index; let idx = $index) {
                    <th [style.width]="colonne[key].lunghezza">
                      {{ key }}
                    </th>
                  }
                  @if (azioni.length > 0) {
                    <th [style.width]="lunghezzaAzioni">Azioni</th>
                  }
                </tr>
              </thead>
              <tbody>
                @for (elem of elemFilter(); track $index) {
                  <tr>
                    @for (key of keyofElem; track $index; let idx = $index) {
                      <td
                        [attr.data-label]="key"
                        [style.width]="colonne[key].lunghezza"
                      >
                        <div class="cell-content">{{ elem[key] }}</div>
                      </td>
                    }
                    @if (azioni.length > 0) {
                      <td [style.width]="lunghezzaAzioni" class="actions-cell">
                        <div class="actions-wrapper">
                          @for (azione of azioni; track $index) {
                            <button
                              class="action-btn"
                              (click)="azione.azione(elem, $index)"
                              [title]="azione.titolo"
                              [attr.aria-label]="azione.titolo"
                            >
                              <i [class]="azione.icona"></i>
                            </button>
                          }
                        </div>
                      </td>
                    }
                  </tr>
                }
              </tbody>
            </table>
          </div>

          @if (elemTable().length > elemForPage) {
            <div class="pagination-container">
              <div class="pagination-info">
                <span class="pagination-text">
                  Mostrando {{ (currentPage() - 1) * elemForPage + 1 }} -
                  {{ currentPage() * elemForPage }}
                  di {{ elemTable().length }} elementi
                </span>
              </div>

              <div class="pagination-controls">
                <button
                  class="pagination-btn prev-btn"
                  (click)="previousPage()"
                  [disabled]="currentPage() === 1"
                  [class.disabled]="currentPage() === 1"
                  aria-label="Pagina precedente"
                >
                  <i class="bi bi-chevron-left"></i>
                </button>

                <div class="page-indicator">
                  <span class="current-page">{{ currentPage() }}</span>
                  <span class="separator">/</span>
                  <span class="total-pages">{{ totalPage() }}</span>
                </div>

                <button
                  class="pagination-btn next-btn"
                  (click)="nextPage()"
                  [disabled]="currentPage() === totalPage()"
                  [class.disabled]="currentPage() === totalPage()"
                  aria-label="Pagina successiva"
                >
                  <i class="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>
          }
        </div>
      } @else {
        @if (titoloTabella) {
          <div class="table-header">
            <div class="header-content">
              <i class="bi bi-table header-icon"></i>
              <h3 class="header-title">
                {{ titoloTabella | capitalizeFirstLetter }}
              </h3>
              <div class="header-info">
                <span class="total-items">
                  <i class="bi bi-list-ol me-1"></i>
                  {{ elemTable().length }} elementi
                </span>
              </div>
            </div>
          </div>
        }

        <div class="empty-state">
          <i class="bi bi-inbox empty-icon"></i>
          <p class="empty-text">{{ noElement }}</p>
        </div>
      }
    </div>
  `,
  styleUrl: '../styles/table-custom.scss',
})
export class TabellaCustomComponent<T> {
  @Input() elemTable!: Signal<T[]>;
  @Input() keyofElem!: (keyof T)[];
  @Input() colonne!: Record<keyof T, ColonnaCustom>;
  @Input() noElement: string = 'Nessun Elemento';
  @Input() titoloTabella: string = '';
  @Input() lunghezzaTotale: string = '30rem';
  @Input() lunghezzaAzioni: string = '10rem';
  @Input() azioni: AzioniTabella<T>[] = [];
  @Input() elemForPage: number = 10;

  public currentPage = signal<number>(1);

  public totalPage = computed<number>(() =>
    Math.ceil(this.elemTable().length / this.elemForPage),
  );

  public elemFilter = computed<T[]>(() =>
    this.elemTable().slice(
      (this.currentPage() - 1) * this.elemForPage,
      this.currentPage() * this.elemForPage,
    ),
  );

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((x: number) => x - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPage()) {
      this.currentPage.update((x: number) => x + 1);
    }
  }
}

export interface AzioniTabella<T> {
  icona: string;
  titolo: string;
  azione: (elem: T, index: number) => void;
}

export interface ColonnaCustom {
  titolo: string;
  lunghezza: string; // e.g., '3rem', '100px', 'auto'
}
