import {
  Component,
  computed,
  EventEmitter,
  HostListener,
  inject,
  Output,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataHttp } from '../../../../core/api/http.data';
import { CardCustomComponent } from '../../../../shared/components/custom/card-custom.component';
import { debounceTimeoutCustom } from '../../../../shared/functions/utilities.function';
import { Lingua } from '../../../../shared/interfaces/http.interface';

@Component({
  selector: 'app-carousel-home',
  standalone: true,
  imports: [CardCustomComponent],
  template: `
    <section id="CardsRow">
      <div class="container position-relative">
        <div class="text-center" style="margin-top: 4rem;">
          <h4 class="fw-bold display-4" style="color: var(--text-color);">
            Home - Miciomania
          </h4>
        </div>

        <div
          class="position-relative d-flex justify-content-center align-items-center mt-5"
        >
          <!-- Freccia sinistra -->
          @if (visualizzaButtoni() && !disableLeft()) {
            <button
              class="btn position-absolute start-0 top-50 translate-middle-y shadow button-carousel"
              (click)="scrollCards(-1)"
            >
              <i class="bi bi-chevron-left fs-4"></i>
            </button>
          }

          <!-- Carousel container -->
          <div
            class="d-flex flex-nowrap justify-content-center gap-4 px-2"
            style="scroll-snap-type: x mandatory;"
          >
            @for (card of cardElementSlice(); track $index) {
              <app-card-custom
                [link]="card.link"
                [titolo]="card.titolo[lingua()]"
                [titoloBottone]="card.titoloBottone[lingua()]"
                [classBody]="card.bgClass + ' home-class'"
                [icona]="card.icon"
                (clickBotton)="card.func()"
              >
                <p descrizioneContent>{{ card.descrizione[lingua()] }}</p>
              </app-card-custom>
            }
          </div>

          <!-- Freccia destra -->
          @if (visualizzaButtoni() && !disableRight()) {
            <button
              class="btn position-absolute end-0 top-50 translate-middle-y shadow button-carousel"
              (click)="scrollCards(1)"
            >
              <i class="bi bi-chevron-right fs-4"></i>
            </button>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
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
export class CarouselHomeComponent {
  private router = inject(Router);

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
      bgClass: 'bg-success text-white',
      icon: 'bi bi-journal-text',
      func: () => this.router.navigate(['/manga']),
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
      bgClass: 'bg-danger text-white',
      icon: 'bi bi-soundwave',
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
      bgClass: 'bg-warning text-dark',
      icon: 'bi bi-trophy',
      func: () => this.router.navigate(['/games']),
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
    // {
    //   link: 'https://th.bing.com/th/id/R.1bb085016d322d7b6e616ca76aab6dc4?rik=QG0sQbKYTDWOig&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f05%2fMathematics-Wallpaper.jpg&ehk=92ltdlU8VUJkJzXH%2bvQPz2GOWL177iz4l6qFMpsoi2M%3d&risl=&pid=ImgRaw&r=0',
    //   bgClass: 'bg-primary text-white',
    //   icon: '',
    //   func: ()=> this.router.navigate(['/math']),
    //   titolo: {
    //     it: '🧮 Risolvi le Equazioni',
    //     en: '🧮 Solve Equations',
    //   },
    //   titoloBottone: {
    //     it: 'Matematica',
    //     en: 'Mathematics',
    //   },
    //   descrizione: {
    //     it: 'Scopri il mondo della matematica attraverso giochi interattivi, problemi logici e sfide di calcolo che metteranno alla prova le tue abilità.',
    //     en: 'Discover the world of mathematics through interactive games, logic problems and calculation challenges that will test your skills.',
    //   },
    // },
  ];
}

interface CardElement {
  link: string;
  bgClass: string;
  icon: string;
  func: Function;
  titolo: Record<Lingua, string>;
  titoloBottone: Record<Lingua, string>;
  descrizione: Record<Lingua, string>;
}
