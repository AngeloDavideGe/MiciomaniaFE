import {
  ChangeDetectionStrategy,
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
  selector: 'app-paginazione-indy',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './pagination-indy.component.html',
  styleUrl: './pagination-indy.component.scss',
})
export class PaginazioneIndyComponent<T> {
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
