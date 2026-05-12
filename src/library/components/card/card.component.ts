import {
  Component,
  computed,
  HostListener,
  inject,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router } from '@angular/router';
import { debounceTimeoutCustom } from '../../functions/debounce.function';
import { GetFiltriCustom } from '../../functions/pagination.function';
import { iCard } from '../../interfaces/card.interface';
import {
  FiltriInterface,
  RaggioPage,
  TypePagination,
} from '../../interfaces/pagination.interface';
import { PaginazioneCustomComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-card-custom',
  standalone: true,
  imports: [PaginazioneCustomComponent],
  templateUrl: './card.component.html',
  styles: [
    `
      .card {
        height: 100%;
      }

      .button-carousel {
        z-index: 100;
        border: 1px solid var(--primary-color);
        background-color: var(--surface-color);
        color: var(--primary-color);

        &:hover {
          background-color: var(--primary-hover);
          color: var(--bg-lighter);
        }
      }
    `,
  ],
})
export class CardCustomComponent implements OnInit {
  public router = inject(Router);

  public filtri: FiltriInterface<iCard> = {} as FiltriInterface<iCard>;
  public elemForPage = signal<number>(0);

  @Input() elems!: WritableSignal<iCard[]>;
  @Input() lunghezzaCard: string = '20rem';
  @Input() altezzaImg: string = '20rem';
  @Input() titoloLista: string = '';
  @Input() classBody: string = '';
  @Input() tipoSlice: TypePagination = 'all';
  @Input() arrayPags: RaggioPage[] = [];

  public viewFirstButton = computed<boolean>(() => {
    const currentSlice: number = this.filtri.currentSlice();

    return this.tipoSlice == 'single' && currentSlice > 0;
  });

  public viewLastButton = computed<boolean>(() => {
    const currentSlice: number = this.filtri.currentSlice();
    const totElem: number = this.filtri.searchElems().length;
    const elemForPage: number = this.elemForPage();

    return this.tipoSlice == 'single' && totElem > elemForPage + currentSlice;
  });

  ngOnInit(): void {
    this.elemForPage.set(this.getNumCards());

    this.filtri = GetFiltriCustom<iCard, null>({
      elemTable: this.elems,
      elemForPage: this.elemForPage,
      slice: this.tipoSlice,
    });
  }

  @HostListener('window:resize')
  onResize = debounceTimeoutCustom(() => {
    this.filtri.currentPage.set(1);
    this.filtri.currentSlice.set(0);
    this.elemForPage.set(this.getNumCards());
  });

  private getNumCards(): number {
    const width: number = window.innerWidth;

    const raggioConfig: RaggioPage | undefined = this.arrayPags.find(
      (config: RaggioPage) => width >= config.width,
    );

    return raggioConfig ? raggioConfig.raggio : 2;
  }

  public clickButton(index: number): void {
    let realIndex: number;

    switch (this.tipoSlice) {
      case 'all': {
        realIndex = index;
        break;
      }
      case 'page': {
        realIndex =
          index + (this.filtri.currentPage() - 1) * this.elemForPage();
        break;
      }
      case 'single': {
        realIndex = index + this.filtri.currentSlice();
        break;
      }
      default: {
        realIndex = index;
      }
    }

    if (this.elems()[realIndex].routerLink) {
      this.router.navigate([this.elems()[realIndex].routerLink]);
    } else if (this.elems()[realIndex].azione) {
      this.elems()[realIndex].azione!();
    }
  }
}
