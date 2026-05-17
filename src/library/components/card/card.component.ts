import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnInit,
  Output,
  Signal,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { debounceTimeoutCustom } from '../../functions/debounce.function';
import { GetFiltriCustom } from '../../functions/pagination.function';
import { iCard } from '../../interfaces/card.interface';
import {
  FiltriInterface,
  RaggioPage,
  TypeButton,
  TypePagination,
} from '../../interfaces/pagination.interface';
import { PaginazioneCustomComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-card-custom',
  standalone: true,
  imports: [PaginazioneCustomComponent, NgTemplateOutlet],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardCustomComponent implements OnInit {
  public router = inject(Router);

  public filtri: FiltriInterface<iCard> = {} as FiltriInterface<iCard>;
  public elemForPage = signal<number>(0);
  public currentButton = signal<string | null>(null);

  @Input() elems?: Signal<iCard[]>;
  @Input() singleElem?: iCard;
  @Input() lunghezzaCard: string = '20rem';
  @Input() altezzaImg: string = '20rem';
  @Input() titoloLista: string = '';
  @Input() classBody: string = '';
  @Input() tipoSlice: TypePagination = 'all';
  @Input() tipoBottone: TypeButton = 'Default';
  @Input() arrayPags: RaggioPage[] = [];

  @Output() clickStopBotton = new EventEmitter<void>();

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
    if (this.elems) {
      this.elemForPage.set(this.getNumCards());
      this.filtri = GetFiltriCustom<iCard, null>({
        elemTable: this.elems,
        elemForPage: this.elemForPage,
        slice: this.tipoSlice,
      });
    }
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

  public clickButton(elem: iCard): void {
    if (elem.routerLink) {
      this.router.navigate([elem.routerLink]);
    } else if (elem.azione) {
      elem.azione();
    }
  }

  public clickSongButton(elem: iCard): void {
    this.clickButton(elem);
    this.currentButton.update((x: string | null) =>
      x == elem.titolo ? null : elem.titolo,
    );
  }

  public stopFunc(): void {
    this.currentButton.set(null);
    this.clickStopBotton.emit();
  }
}
