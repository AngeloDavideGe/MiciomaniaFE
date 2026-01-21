import {
  Component,
  computed,
  EventEmitter,
  HostListener,
  Output,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataHttp } from '../../../../core/api/http.data';
import { debounceTimeoutCustom } from '../../../../shared/functions/utilities.function';
import { Lingua } from '../../../../shared/interfaces/http.interface';

@Component({
  selector: 'app-card-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="py-5" id="CardsRow">
      <div class="container position-relative">
        <div class="text-center mb-5">
          <h4 class="fw-bold display-4">Home - Miciomania</h4>
        </div>

        <div
          class="position-relative d-flex justify-content-center align-items-center"
        >
          <!-- Freccia sinistra -->
          @if (visualizzaButtoni() && !disableLeft()) {
            <button
              class="btn btn-light position-absolute start-0 top-50 translate-middle-y shadow"
              style="z-index: 100; border: 1px solid #9ed0e5;"
              (click)="scrollCards(-1)"
            >
              <i class="bi bi-chevron-left fs-4"></i>
            </button>
          }

          <!-- Carousel container -->
          <div class="overflow-hidden w-100">
            <div
              class="d-flex flex-nowrap justify-content-center gap-4 px-2"
              #carouselTrack
              style="scroll-snap-type: x mandatory;"
            >
              @for (card of cardElementSlice(); track $index) {
                <div
                  class="card flex-shrink-0"
                  style="width: 300px; scroll-snap-align: center;"
                >
                  <img [src]="card.link" class="card-img-top" alt="..." />
                  <div class="card-body" [class]="card.bgClass">
                    <h5 class="card-title fw-bold">
                      {{ card.titolo[lingua()] }}
                    </h5>
                    <p class="card-text">{{ card.descrizione[lingua()] }}</p>

                    @if (!card.func) {
                      <a [routerLink]="card.aLink" class="btn btn-light">
                        {{ card.titoloBottone[lingua()] }}
                      </a>
                    } @else {
                      <a class="btn btn-light" (click)="card.func()">
                        {{ card.titoloBottone[lingua()] }}
                      </a>
                    }
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Freccia destra -->
          @if (visualizzaButtoni() && !disableRight()) {
            <button
              class="btn btn-light position-absolute end-0 top-50 translate-middle-y shadow"
              style="z-index: 100; border: 1px solid #9ed0e5;"
              (click)="scrollCards(1)"
            >
              <i class="bi bi-chevron-right fs-4"></i>
            </button>
          }
        </div>
      </div>
    </section>
  `,
  styles: [``],
})
export class CardHomeComponent {
  @Output() canzone = new EventEmitter<void>();

  private maxCards = signal<number>(this.getNumCards());
  public currentIndex = signal<number>(0);

  public lingua = computed<Lingua>(() => DataHttp.lingua());

  public visualizzaButtoni = computed<boolean>(() => {
    return this.cardElements.length > this.maxCards();
  });

  public disableLeft = computed<boolean>(() => {
    return this.currentIndex() == 0;
  });

  public disableRight = computed<boolean>(() => {
    return this.currentIndex() + this.maxCards() >= this.cardElements.length;
  });

  public cardElementSlice = computed<CardElement[]>(() => {
    const currentIndex: number = this.currentIndex();
    const maxCards: number = this.maxCards();
    return this.cardElements.slice(currentIndex, currentIndex + maxCards);
  });

  public scrollCards(direction: 1 | -1): void {
    this.currentIndex.update((v: number) => v + direction);
  }

  @HostListener('window:resize')
  onResize = debounceTimeoutCustom(() => {
    this.maxCards.set(this.getNumCards());
    this.currentIndex.set(0);
  });

  private getNumCards(): number {
    const width: number = window.innerWidth;
    if (width >= 1800) {
      return 4;
    } else if (width >= 1200 && width < 1800) {
      return 3;
    } else if (width >= 769 && width < 1200) {
      return 2;
    } else {
      return 1;
    }
  }

  private cardElements: CardElement[] = [
    {
      link: 'https://thesoundcheck.it/wp-content/uploads/2022/11/kono-manga-ga-sugoi-2021-migliori-riviste-manga-weekly-shonen-jump-secondo-v3-488235.jpg',
      aLink: '/manga',
      bgClass: 'bg-success text-white',
      func: null,
      titolo: {
        it: '📚 Manga Miciomania',
        en: '📚 Miciomania Manga',
      },
      titoloBottone: {
        it: 'Manga',
        en: 'Manga',
      },
      descrizione: {
        it: 'Esplora il mondo dei manga di Miciomania (Parodie e non), così da capire come facciamo piangere le donne.',
        en: 'Explore the world of Miciomania manga (parodies and more), to understand how we make women cry.',
      },
    },
    {
      link: 'https://www.vice.com/wp-content/uploads/sites/2/2019/12/1577443774135-thumb_canzoni_internazionali.jpeg?w=1024',
      aLink: '/canzoni',
      bgClass: 'bg-danger text-white',
      func: () => this.canzone.emit(),
      titolo: {
        it: '🎶 Musica Miciomania',
        en: '🎶 Miciomania Music',
      },
      titoloBottone: {
        it: 'Ascolta',
        en: 'Listen',
      },
      descrizione: {
        it: 'Immergiti nel mondo musicale di Miciomania: brani intensi che hanno toccato il cuore (e fatto versare qualche lacrima) a molte ascoltatrici.',
        en: 'Immerse yourself in Miciomania’s musical world: powerful tracks that have touched hearts (and made many listeners shed a tear).',
      },
    },
    {
      link: 'https://www.flashgames.it/giochi/abilita/my.virtual.pet.shop/my.virtual.pet.shop.jpg',
      aLink: '/games',
      bgClass: 'bg-warning text-dark',
      func: null,
      titolo: {
        it: '🎮 Gioca con i sentimenti',
        en: '🎮 Play with Feelings',
      },
      titoloBottone: {
        it: 'Giochi',
        en: 'Games',
      },
      descrizione: {
        it: 'Prova i vari minigiochi Miciomani, non solo quelli con cui tratti male una donna conoscente dei membri di Miciomania.',
        en: 'Try the various Miciomania mini-games, not only the ones where you mistreat a woman known to the group’s members.',
      },
    },
    {
      link: 'https://th.bing.com/th/id/R.1bb085016d322d7b6e616ca76aab6dc4?rik=QG0sQbKYTDWOig&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f05%2fMathematics-Wallpaper.jpg&ehk=92ltdlU8VUJkJzXH%2bvQPz2GOWL177iz4l6qFMpsoi2M%3d&risl=&pid=ImgRaw&r=0',
      aLink: '/math',
      bgClass: 'bg-primary text-white',
      func: null,
      titolo: {
        it: '🧮 Risolvi le Equazioni',
        en: '🧮 Solve Equations',
      },
      titoloBottone: {
        it: 'Matematica',
        en: 'Mathematics',
      },
      descrizione: {
        it: 'Scopri il mondo della matematica attraverso giochi interattivi, problemi logici e sfide di calcolo che metteranno alla prova le tue abilità.',
        en: 'Discover the world of mathematics through interactive games, logic problems and calculation challenges that will test your skills.',
      },
    },
  ];
}

interface CardElement {
  link: string;
  aLink: string;
  bgClass: string;
  func: Function | null;
  titolo: Record<Lingua, string>;
  titoloBottone: Record<Lingua, string>;
  descrizione: Record<Lingua, string>;
}
