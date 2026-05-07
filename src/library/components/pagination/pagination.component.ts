import {
  Component,
  computed,
  HostListener,
  Input,
  signal,
} from '@angular/core';
import { debounceTimeoutCustom } from '../../functions/debounce.function';
import {
  DataTableHttp,
  FiltriInterface,
  OtherPage,
  RaggioPage,
  TipoPaginazione,
} from '../../interfaces/pagination.interface';

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
            [disabled]="filtri.currentPage() === 1"
            [class.disabled]="filtri.currentPage() === 1"
            aria-label="Pagina precedente"
          >
            <i class="bi bi-chevron-left"></i>
          </button>

          @switch (tipo) {
            @case ('singolo') {
              <div class="page-indicator">
                <span class="current-page">{{ filtri.currentPage() }}</span>
                <span class="separator">/</span>
                <span class="total-pages">{{ filtri.totalPage() }}</span>
              </div>
            }
            @case ('multiplo') {
              <div class="page-indicator">
                @if (othersPage().startNumber) {
                  <button
                    class="page-btn"
                    (click)="filtri.selectPage(1)"
                    [class.active]="filtri.currentPage() === 1"
                    aria-label="Pagina 1"
                  >
                    1
                  </button>
                }

                @if (othersPage().startPointer) {
                  <span class="ellipsis">...</span>
                }

                @for (page of arrayPage(); track $index) {
                  <button
                    class="page-btn"
                    (click)="filtri.selectPage(page)"
                    [class.active]="filtri.currentPage() === page"
                    aria-label="Pagina {{ page }}"
                  >
                    {{ page }}
                  </button>
                }

                @if (othersPage().endPointer) {
                  <span class="ellipsis">...</span>
                }

                @if (othersPage().endNumber) {
                  <button
                    class="page-btn"
                    (click)="filtri.selectPage(filtri.totalPage())"
                    [class.active]="filtri.currentPage() === filtri.totalPage()"
                    aria-label="Pagina {{ filtri.totalPage() }}"
                  >
                    {{ filtri.totalPage() }}
                  </button>
                }
              </div>
            }
          }

          <button
            class="pagination-btn next-btn"
            (click)="filtri.nextPage()"
            [disabled]="filtri.currentPage() === filtri.totalPage()"
            [class.disabled]="filtri.currentPage() === filtri.totalPage()"
            aria-label="Pagina successiva"
          >
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    }
  `,
  styleUrl: './pagination.component.scss',
})
export class PaginazioneCustomComponent<T> {
  @Input() filtri!: FiltriInterface<T>;
  @Input() tipo: TipoPaginazione = 'multiplo';
  @Input() dataTableHttp: DataTableHttp<T> | null = null;
  @Input() arrayRaggi: RaggioPage[] = [{ width: Infinity, raggio: 2 }];

  private raggioPage = signal<number>(this.getRaggioPage());

  public arrayPage = computed<number[]>(() => {
    const totalPageValue: number = this.filtri.totalPage();
    const currentPages: number = this.filtri.currentPage();
    const raggioPage: number = this.raggioPage();

    const start: number = Math.max(1, currentPages - raggioPage);
    const end: number = Math.min(totalPageValue, currentPages + raggioPage);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  public othersPage = computed<OtherPage>(() => {
    const arrayPage: number[] = this.arrayPage();
    const totalPage: number = this.filtri.totalPage();

    return {
      startNumber: arrayPage[0] > 1,
      startPointer: arrayPage[0] > 2,
      endPointer: arrayPage[arrayPage.length - 1] < totalPage - 1,
      endNumber: arrayPage[arrayPage.length - 1] < totalPage,
    };
  });

  @HostListener('window:resize') onResize = debounceTimeoutCustom(() => {
    this.raggioPage.set(this.getRaggioPage());
  });

  private getRaggioPage(): number {
    const width: number = window.innerWidth;

    const raggioConfig: RaggioPage | undefined = this.arrayRaggi.find(
      (config: RaggioPage) => width <= config.width,
    );

    return raggioConfig ? raggioConfig.raggio : 2;
  }
}
