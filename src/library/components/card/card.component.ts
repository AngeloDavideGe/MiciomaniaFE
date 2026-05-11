import {
  Component,
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
} from '../../interfaces/pagination.interface';
import { PaginazioneCustomComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-card-custom',
  standalone: true,
  imports: [PaginazioneCustomComponent],
  template: `
    <div class="position-relative w-100">
      @if (tipoSlice == 'page') {
        <app-paginazione-custom
          [filtri]="filtri"
          [tipo]="'singolo'"
          [titoloLista]="titoloLista"
        ></app-paginazione-custom>
      }

      @if (tipoSlice == 'single') {
        <button
          class="btn position-absolute start-0 top-50 translate-middle-y shadow button-carousel"
          (click)="filtri.previousSlice()"
        >
          <i class="bi bi-chevron-left fs-4"></i>
        </button>
      }

      <div class="grid-card-layout" style="--card-width: {{ lunghezzaCard }}">
        @for (elem of filtri.elemFilter(); track elem.titolo) {
          <div class="card h-100" [style]="{ width: lunghezzaCard }">
            @if (elem.urlPic) {
              <img
                [src]="elem.urlPic"
                [style]="{ height: altezzaImg }"
                class="card-img-top object-fit-cover"
              />
            }

            <div class="card-body d-flex flex-column" [class]="classBody">
              <h5 class="fw-bold">
                {{ elem.titolo }}
              </h5>

              @if (elem.descrizione) {
                <div class="card-text" [innerHTML]="elem.descrizione"></div>
              }

              @if (elem.bottone) {
                <button
                  class="btn btn-primary mt-auto"
                  (click)="clickButton($index)"
                >
                  {{ elem.bottone }}
                </button>
              }
            </div>
          </div>
        }
      </div>

      @if (tipoSlice == 'single') {
        <button
          class="btn position-absolute end-0 top-50 translate-middle-y shadow button-carousel"
          (click)="filtri.nextSlice()"
        >
          <i class="bi bi-chevron-right fs-4"></i>
        </button>
      }
    </div>
  `,
  styles: [
    `
      .card {
        height: 100%;
      }

      .card-text {
        margin-bottom: 1rem;
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
  @Input() tipoSlice: 'page' | 'single' = 'page';
  @Input() arrayPags: RaggioPage[] = [];

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

    if (this.tipoSlice == 'page') {
      realIndex = index + (this.filtri.currentPage() - 1) * this.elemForPage();
    } else {
      realIndex = index + this.filtri.currentSlice();
    }

    if (this.elems()[realIndex].routerLink) {
      this.router.navigate([this.elems()[realIndex].routerLink]);
    } else if (this.elems()[realIndex].azione) {
      this.elems()[realIndex].azione!();
    }
  }
}
