import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  Input,
  Output,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { debounceTimeoutCustom } from '../../functions/utilities.function';
import { CapitalizeFirstLetterPipe } from '../../pipes/capitalize.pipe';
import {
  DataTableHttp,
  FiltriInterface,
  GetFiltriCustom,
  Ordinamento,
} from '../../utilities/functions/pagination.utilities';
import { SpinnerComponent } from '../dialogs/spinner.component';
import {
  PaginazioneCustomComponent,
  TipoPaginazione,
} from './pagination.component';

@Component({
  selector: 'app-table-custom',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    CapitalizeFirstLetterPipe,
    PaginazioneCustomComponent,
    SpinnerComponent,
  ],
  template: `
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
                {{ filtri.dettaglioPage() }}
              </span>
            </div>
          </div>
        </div>
      }

      @if (filtroDefault) {
        <div class="search-filter">
          <i class="bi bi-search search-icon"></i>
          <input
            type="text"
            class="search-input"
            placeholder="Cerca..."
            [(ngModel)]="searchQuery"
            (ngModelChange)="searchQuery.set($event)"
          />
          <button
            class="clear-btn"
            (click)="searchQuery.set(''); ordinaElem.set(null)"
          >
            <i class="bi bi-x-circle"></i>
          </button>
        </div>
      }

      @if (filtri.elemFilter().length > 0 || dataTableHttp) {
        <div class="table-container">
          <table class="table-custom">
            <thead>
              <tr>
                @for (key of keyofElem; track $index; let idx = $index) {
                  <th
                    [style.width]="colonne[key]!.lunghezza"
                    (click)="ordinaColonna(key)"
                  >
                    {{ colonne[key]!.titolo }}

                    @if (colonne[key]!.sortCol) {
                      <span>&nbsp;↕️</span>
                    }
                  </th>
                }
                @if (azioni.length > 0) {
                  <th [style.width]="lunghezzaAzioni">{{ titoloColAzioni }}</th>
                }
              </tr>
            </thead>
            <tbody>
              @for (
                elem of filtri.elemFilter();
                track trackByFn($index, elem)
              ) {
                <tr>
                  @for (key of keyofElem; track $index) {
                    <td
                      [attr.data-label]="key"
                      [style.width]="colonne[key]!.lunghezza"
                    >
                      <div
                        class="cell-content"
                        [class]="recordBadge['' + elem[key]]"
                      >
                        {{ colonne[key]!.formatCell!(elem[key]) }}
                      </div>
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

        <app-paginazione-custom
          [filtri]="filtri"
          [tipo]="tipoPaginazione"
          [dataTableHttp]="dataTableHttp"
        ></app-paginazione-custom>

        <div
          class="elemento-finale px-2 mt-2 mb-2"
          style="--align-end: center;"
        >
          <label class="label-elementi-pagina" for="perPageSelect">
            Elementi per pagina:
          </label>

          <select
            id="perPageSelect"
            class="select-elementi-pagina"
            [ngModel]="elemForPage()"
            (ngModelChange)="elemForPage.set($event); filtri.currentPage.set(1)"
          >
            @for (numElem of arrayElemForPage; track numElem) {
              <option [ngValue]="numElem">
                {{ numElem }}
              </option>
            }
          </select>
        </div>
      }

      @if (filtri.elemFilter().length == 0) {
        @if (dataTableHttp) {
          <app-spinner [mt]="'2rem'"></app-spinner>
        } @else {
          <div class="empty-state">
            <i class="bi bi-inbox empty-icon"></i>
            <p class="empty-text">{{ noElement }}</p>
          </div>
        }
      }
    </div>
  `,
  styleUrl: '../styles/table-custom.scss',
})
export class TabellaCustomComponent<T> {
  @Input() colonne!: Partial<RecordColonne<T>>;
  @Input() elemTable: Signal<T[]> = signal<T[]>([]);
  @Input() dataTableHttp: DataTableHttp<T> | null = null;
  @Input() noElement: string = 'Nessun Elemento';
  @Input() titoloTabella: string = '';
  @Input() lunghezzaAzioni: string = '10rem';
  @Input() titoloColAzioni: string = 'Azioni';
  @Input() azioni: AzioniTabella<T>[] = [];
  @Input() tipoPaginazione: TipoPaginazione = 'multiplo';
  @Input() arrayElemForPage: number[] = [1, 5, 10, 20, 50, 100];
  @Input() elemForPage = signal<number>(environment.maxElement.elemPagine);
  @Input() recordBadge: Record<string, string> = {};
  @Input() trackByKey: keyof T = 'id' as keyof T;

  @Output() changeElements = new EventEmitter<ChangePageHttp>();

  public keyofElem: Array<keyof T> = [];
  public searchQuery = signal<string>('');
  private debounceQuery = signal<string>('');
  public ordinaElem = signal<OrdinamentoHttp<T>>(null);
  public filtri: FiltriInterface<T> = {} as FiltriInterface<T>;
  public filtroDefault: boolean = true;
  private changePageHttp: ChangePageHttp = {
    page: 1,
    elemForPage: this.elemForPage(),
    order: null,
    orderKey: null,
    search: null,
    searchKey: null,
  };

  public ordinaColonna: Function = debounceTimeoutCustom((key: keyof T) => {
    if (!this.colonne[key]!.sortCol) return;

    this.ordinaElem.set({
      key: key,
      order:
        this.ordinaElem()?.key === key && this.ordinaElem()?.order === 'desc'
          ? 'cresc'
          : 'desc',
    });
  }, true);

  constructor() {
    const debounced: Function = debounceTimeoutCustom((value: string) => {
      this.debounceQuery.set(value);
      this.filtri.currentPage.set(this.filtri.totalPage() > 0 ? 1 : 0);
    });

    const debouncedHttp: Function = debounceTimeoutCustom(() => {
      this.changeElements.emit(this.changePageHttp);
    }, true);

    effect(() => debounced(this.searchQuery()));

    effect(() => {
      const search: string = this.searchQuery();
      const order: OrdinamentoHttp<T> = this.ordinaElem();
      const elemForPage: number = this.elemForPage();
      const currentPage: number = this.filtri.currentPage();

      this.changePageHttp = {
        page: currentPage,
        elemForPage: elemForPage,
        order: order ? order.order : null,
        orderKey: order ? (order.key as string) : null,
        search: search ? search : null,
        searchKey: search ? (this.keyofElem[0] as string) : null,
      };

      debouncedHttp();
    });
  }

  ngOnInit(): void {
    this.keyofElem = Object.keys(this.colonne) as (keyof T)[];

    this.colonne = this.keyofElem.reduce(
      (acc: Partial<RecordColonne<T>>, key: keyof T) => {
        acc[key] = {
          ...this.colonne[key],
          formatCell:
            this.colonne[key]!.formatCell ||
            ((value: T[keyof T]) => String(value)),
        };
        return acc;
      },
      {},
    );

    this.filtroDefault = this.keyofElem.every(
      (key: keyof T) => !this.colonne[key]!.filtro,
    );

    if (this.dataTableHttp) {
      this.filtri = GetFiltriCustom<T, null>({
        elemTable: this.dataTableHttp.elems,
        elemForPage: this.elemForPage,
        totalPageHttp: this.dataTableHttp.totalPages,
        totalElemHttp: this.dataTableHttp.totalElems,
      });
    } else {
      this.filtri = GetFiltriCustom<T, null>({
        elemTable: this.elemTable,
        elemForPage: this.elemForPage,
        ordinaElem: this.ordinaElem,
        tipoSelect: this.filtroDefault ? 'some' : 'every',
        select: this.keyofElem.map((x: keyof T) => {
          return {
            key: x,
            query: this.colonne[x]!.filtro || this.debounceQuery,
          };
        }),
      });
    }
  }

  public trackByFn(index: number, item: T): T[keyof T] | number {
    const keyValue: T[keyof T] = item[this.trackByKey];
    return keyValue ?? index;
  }
}

export type OrdinamentoHttp<T> = Ordinamento<T, 'desc' | 'cresc'> | null;
export type RecordColonne<T> = { [K in keyof T]: ColonnaConfig<T, K> };

export interface AzioniTabella<T> {
  icona: string;
  titolo: string;
  azione: (elem: T, index: number) => void;
}

interface ColonnaConfig<T, K extends keyof T> {
  titolo: string;
  lunghezza: string;
  filtro?: WritableSignal<string>;
  sortCol?: boolean;
  formatCell?: (value: T[K]) => string;
}

export interface ChangePageHttp {
  page: number;
  elemForPage: number;
  order: 'desc' | 'cresc' | null;
  orderKey: string | null;
  search: string | null;
  searchKey: string | null;
}
