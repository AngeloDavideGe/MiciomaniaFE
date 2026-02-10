import { Component, computed, Input, Signal, signal } from '@angular/core';
import {
  FiltriInterface,
  GetFiltriCustom,
} from '../../utilities/pagination.utilities';

@Component({
  selector: 'app-table-custom',
  standalone: true,
  imports: [],
  template: `
    <div [style]="{ width: lunghezzaTotale }">
      <div class="table-wrapper">
        @if (elemTable().length > 0) {
          @if (titoloTabella) {
            <div class="table-header">
              <div class="header-content">
                <i class="bi bi-table header-icon"></i>
                <h3 class="header-title">
                  {{ titoloTabella }}
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
                      {{ colonne[key].titolo }}
                    </th>
                  }
                  @if (azioni.length > 0) {
                    <th [style.width]="lunghezzaAzioni">Azioni</th>
                  }
                </tr>
              </thead>
              <tbody>
                @for (elem of filtri.elemFilter(); track $index) {
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

              @if (elemForPage > 0) {
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
              }
            </div>
          }
        } @else {
          @if (titoloTabella) {
            <div class="table-header">
              <div class="header-content">
                <i class="bi bi-table header-icon"></i>
                <h3 class="header-title">
                  {{ titoloTabella }}
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
    </div>
  `,
  styleUrls: [
    '../styles/table-custom.scss',
    '../styles/pagination-custom.scss',
  ],
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
  @Input() elemForPage: number = 0;

  public currentPage = signal<number>(1);
  public filtri: FiltriInterface<T> = {} as FiltriInterface<T>;

  ngOnInit(): void {
    this.filtri = GetFiltriCustom<T, null>({
      elemTable: this.elemTable,
      elemForPage: this.elemForPage,
      currentPage: this.currentPage,
    });
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
