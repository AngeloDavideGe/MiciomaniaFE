import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  Input,
  Output,
  Signal,
  signal,
  TemplateRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTimeoutCustom } from '../../functions/debounce.function';
import { GetFiltriCustom } from '../../functions/pagination.function';
import {
  DataTableHttp,
  FiltriInterface,
  RaggioPage,
  TipoPaginazione,
} from '../../interfaces/pagination.interface';
import {
  AzioniTabella,
  ChangePageHttp,
  OrdinamentoHttp,
  RecordColonne,
} from '../../interfaces/table.interface';
import { CapitalizeFirstLetterPipe } from '../../pipes/capitalize.pipe';
import { PaginazioneIndyComponent } from '../pagination/pagination-indy.component';
import { SpinnerIndyComponent } from '../spinner/spinner-indy.component';

@Component({
  selector: 'app-table-indy',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    CapitalizeFirstLetterPipe,
    PaginazioneIndyComponent,
    SpinnerIndyComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './table-indy.component.html',
  styleUrl: './table-indy.component.scss',
})
export class TabellaIndyComponent<T> {
  @Input() colonne!: Partial<RecordColonne<T>>;
  @Input() elemTable: Signal<T[]> = signal<T[]>([]);
  @Input() dataTableHttp: DataTableHttp<T> | null = null;
  @Input() noElement: string = 'Nessun Elemento';
  @Input() titoloTabella: string = '';
  @Input() lunghezzaAzioni: string = '10rem';
  @Input() titoloColAzioni: string = 'Azioni';
  @Input() azioni: AzioniTabella<T>[] = [];
  @Input() tipoPaginazione: TipoPaginazione = 'multiplo';
  @Input() arrayElemForPage: number[] = [1, 5, 10, 20];
  @Input() elemForPage = signal<number>(20);
  @Input() recordBadge: Record<string, string> = {};
  @Input() trackByKey: keyof T = 'id' as keyof T;
  @Input() templateCustom?: TemplateRef<any>;
  @Input() keyPrimary?: keyof T;

  @Output() changeElements = new EventEmitter<ChangePageHttp>();

  public keyofElem: Array<keyof T> = [];
  public searchQuery = signal<string>('');
  private debounceQuery = signal<string>('');
  public ordinaElem = signal<OrdinamentoHttp<T>>(null);
  public filtri: FiltriInterface<T> = {} as FiltriInterface<T>;
  public filtroDefault: boolean = true;
  public raggiPage: RaggioPage[] = this.getRaggiPage();
  public expandedRow = signal<any>(null);
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

    if (this.ordinaElem()?.key !== key) {
      this.ordinaElem.set({
        key: key,
        order: 'desc',
      });
    } else {
      let newOrder: 'desc' | 'cresc' | undefined = this.ordinaElem()?.order;

      if (newOrder === 'desc') {
        newOrder = 'cresc';
      } else if (newOrder === 'cresc') {
        newOrder = undefined;
      } else {
        newOrder = 'desc';
      }

      if (newOrder) {
        this.ordinaElem.set({
          key: key,
          order: newOrder,
        });
      } else {
        this.ordinaElem.set(null);
      }
    }
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

  private getRaggiPage(): RaggioPage[] {
    return [
      { width: 576, raggio: 1 },
      { width: 768, raggio: 2 },
      { width: 992, raggio: 3 },
      { width: 1200, raggio: 4 },
      { width: Infinity, raggio: 5 },
    ];
  }

  public toggleExpandedRow(key: any): void {
    this.expandedRow.update((x: any) => {
      if (x == key) return null;
      else return key;
    });
  }
}
