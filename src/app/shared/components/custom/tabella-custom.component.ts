import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  effect,
  Input,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTimeoutCustom } from '../../functions/utilities.function';
import { CapitalizeFirstLetterPipe } from '../../pipes/capitalize.pipe';
import {
  FiltriInterface,
  GetFiltriCustom,
  Ordinamento,
} from '../../utilities/pagination.utilities';
import {
  PaginazioneCustomComponent,
  TipoPaginazione,
} from './pagination.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-table-custom',
  standalone: true,
  imports: [
    FormsModule,
    NgTemplateOutlet,
    CapitalizeFirstLetterPipe,
    PaginazioneCustomComponent,
  ],
  template: `
    <div [style]="{ width: lunghezzaTotale }">
      <div class="table-wrapper">
        @if (elemTable().length > 0) {
          <ng-container
            *ngTemplateOutlet="titoloTabellaTemplate"
          ></ng-container>

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
                      <span>&nbsp;↕️</span>
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
                        [style.width]="colonne[key]!.lunghezza"
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

          <app-paginazione-custom
            [filtri]="filtri"
            [currentPage]="currentPage"
            [tipo]="tipoPaginazione"
          ></app-paginazione-custom>
        } @else {
          <ng-container
            *ngTemplateOutlet="titoloTabellaTemplate"
          ></ng-container>

          <div class="empty-state">
            <i class="bi bi-inbox empty-icon"></i>
            <p class="empty-text">{{ noElement }}</p>
          </div>
        }
      </div>
    </div>

    <ng-template #titoloTabellaTemplate>
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
    </ng-template>
  `,
  styleUrl: '../styles/table-custom.scss',
})
export class TabellaCustomComponent<T> {
  @Input() elemTable!: Signal<T[]>;
  @Input() colonne!: Partial<RecordColonne<T>>;
  @Input() noElement: string = 'Nessun Elemento';
  @Input() titoloTabella: string = '';
  @Input() lunghezzaTotale: string = '30rem';
  @Input() lunghezzaAzioni: string = '10rem';
  @Input() azioni: AzioniTabella<T>[] = [];
  @Input() elemForPage: number = environment.maxElement.elemPagine;
  @Input() tipoPaginazione: TipoPaginazione = 'multiplo';

  public keyofElem: Array<keyof T> = [];
  public currentPage = signal<number>(1);
  public searchQuery = signal<string>('');
  private debounceQuery = signal<string>('');
  public ordinaElem = signal<Ordinamento<T, 'desc' | 'cresc'> | null>(null);
  public filtri: FiltriInterface<T> = {} as FiltriInterface<T>;
  private order: Record<keyof T, boolean> = {} as any;
  public filtroDefault: boolean = true;

  public ordinaColonna: Function = debounceTimeoutCustom((key: keyof T) => {
    this.ordinaElem.set({
      key: key,
      order: this.order[key] ? 'desc' : 'cresc',
    });
  }, true);

  constructor() {
    const debounced: Function = debounceTimeoutCustom((value: string) => {
      this.debounceQuery.set(value);
      this.currentPage.set(this.filtri.totalPage() > 0 ? 1 : 0);
    });

    effect(() => debounced(this.searchQuery()));
    effect(() => {
      const ord = this.ordinaElem();
      if (ord) this.order[ord.key] = !this.order[ord.key];
    });
  }

  ngOnInit(): void {
    this.keyofElem = Object.keys(this.colonne) as (keyof T)[];
    this.filtroDefault = this.keyofElem.every(
      (key) => !this.colonne[key]!.filtro,
    );

    this.filtri = GetFiltriCustom<T, null>({
      elemTable: this.elemTable,
      elemForPage: this.elemForPage,
      currentPage: this.currentPage,
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

export interface AzioniTabella<T> {
  icona: string;
  titolo: string;
  azione: (elem: T, index: number) => void;
}

export type RecordColonne<T> = Record<keyof T, ColonnaCustom>;

interface ColonnaCustom {
  titolo: string;
  lunghezza: string;
  filtro?: WritableSignal<string>;
}
