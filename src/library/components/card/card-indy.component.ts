import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  HostListener,
  inject,
  input,
  model,
  output,
  signal,
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
import { ButtonIndyComponent } from '../button/button-indy.component';
import { PaginazioneIndyComponent } from '../pagination/pagination-indy.component';

@Component({
  selector: 'app-card-indy',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PaginazioneIndyComponent, NgTemplateOutlet, ButtonIndyComponent],
  templateUrl: './card-indy.component.html',
  styleUrl: './card-indy.component.scss',
})
export class CardIndyComponent {
  public router = inject(Router);

  public filtri!: FiltriInterface<iCard>;

  public elemForPage = signal<number>(0);
  public elems = input<iCard[] | null>(null);
  public singleElem = input<iCard | null>(null);
  public lunghezzaCard = input<string>('20rem');
  public altezzaImg = input<string>('20rem');
  public cardPosition = input<string>('center');
  public titoloLista = input<string>('');
  public classBody = input<string>('');
  public tipoSlice = input<TypePagination>('all');
  public arrayPags = input<RaggioPage[]>(defaultArrayPags);

  public currentButton = model<string | null>(null);

  public clickStopButton = output<void>();

  public viewFirstButton = computed(() => {
    if (!this.filtri) return false;

    return this.tipoSlice() === 'single' && this.filtri.currentSlice() > 0;
  });

  public viewLastButton = computed(() => {
    if (!this.filtri) return false;

    return (
      this.tipoSlice() === 'single' &&
      this.filtri.searchElems().length >
        this.elemForPage() + this.filtri.currentSlice()
    );
  });

  constructor() {
    effect(() => {
      const elements = this.elems();

      if (elements) {
        this.elemForPage.set(this.getNumCards());

        this.filtri = GetFiltriCustom<iCard, null>({
          elemTable: signal(elements),
          elemForPage: this.elemForPage,
          slice: this.tipoSlice(),
        });
      }
    });
  }

  @HostListener('window:resize')
  public onResize = debounceTimeoutCustom(() => {
    if (!this.filtri) return;

    this.filtri.currentPage?.set(1);
    this.filtri.currentSlice?.set(0);

    this.elemForPage.set(this.getNumCards());
  });

  private getNumCards(): number {
    const width = window.innerWidth;
    const config = this.arrayPags().find((x) => width >= x.width);
    return config?.raggio ?? 2;
  }

  public clickButton(elem: iCard): void {
    if (elem.routerLink) {
      this.router.navigate([elem.routerLink]);
      return;
    }

    elem.azione?.();
  }

  public clickSongButton(elem: iCard): void {
    this.clickButton(elem);

    this.currentButton.update((x) =>
      x === elem.titolo ? null : (elem.titolo ?? null),
    );
  }

  public stopFunc(): void {
    this.currentButton.set(null);
    this.clickStopButton.emit();
  }
}

const defaultArrayPags: RaggioPage[] = [
  {
    width: 2384,
    raggio: 7,
  },
  {
    width: 2040,
    raggio: 6,
  },
  {
    width: 1696,
    raggio: 5,
  },
  {
    width: 1352,
    raggio: 4,
  },
  {
    width: 1100,
    raggio: 3,
  },
  {
    width: 700,
    raggio: 2,
  },
  {
    width: 0,
    raggio: 1,
  },
];
