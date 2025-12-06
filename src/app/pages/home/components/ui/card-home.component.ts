import {
  Component,
  computed,
  effect,
  EventEmitter,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataHttp } from '../../../../core/api/http.data';
import { Lingua } from '../../../../shared/interfaces/http.interface';

@Component({
  selector: 'app-card-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section
      data-bs-version="5.1"
      class="features4 start py-5"
      id="features04-1"
    >
      <div class="container position-relative">
        <div class="text-center mb-5">
          <h4 class="fw-bold display-4">Home - Miciomania</h4>
        </div>

        <!-- Freccia sinistra -->
        <button
          class="btn btn-light position-absolute top-50 start-0 translate-middle-y shadow"
          style="z-index: 10; border-radius: 50%; width: 48px; height: 48px;"
          (click)="scrollCards(-1)"
          [disabled]="disableLeft()"
        >
          <i class="bi bi-chevron-left fs-4"></i>
        </button>

        <!-- Contenitore scroll orizzontale -->
        <div
          class="row flex-nowrap overflow-auto g-4 px-4"
          style="scroll-behavior: smooth;"
          #cardsRow
        >
          @for (card of cardElementSlice(); track $index) {
          <div class="col-12 col-md-6 col-lg-4" style="min-width: 320px;">
            <div class="card h-100">
              <img [src]="card.link" class="card-img-top" alt="..." />
              <div class="card-body" [class]="card.bgClass">
                <h5 class="card-title fw-bold">{{ card.titolo[lingua()] }}</h5>
                <p class="card-text">{{ card.descrizione[lingua()] }}</p>

                @if (!card.func) {
                <a [routerLink]="card.aLink" class="btn btn-light">
                  {{ card.titoloBottone[lingua()] }}
                </a>
                } @else {
                <a
                  class="btn btn-light"
                  (click)="card.func ? card.func() : null"
                >
                  {{ card.titoloBottone[lingua()] }}
                </a>
                }
              </div>
            </div>
          </div>
          }
        </div>

        <!-- Freccia destra -->
        <button
          class="btn btn-light position-absolute top-50 end-0 translate-middle-y shadow"
          style="z-index: 10; border-radius: 50%; width: 48px; height: 48px;"
          (click)="scrollCards(1)"
          [disabled]="disableRight()"
        >
          <i class="bi bi-chevron-right fs-4"></i>
        </button>
      </div>
    </section>
  `,
})
export class CardHomeComponent {
  @Output() canzone = new EventEmitter<void>();

  public lingua = computed<Lingua>(() => DataHttp.lingua());
  public currentIndex = signal<number>(0);
  private maxCards: number = 3;

  public disableLeft = computed<boolean>(() => {
    const currentIndex: number = this.currentIndex();
    return currentIndex == 0;
  });

  public disableRight = computed<boolean>(() => {
    const currentIndex: number = this.currentIndex();
    return currentIndex + this.maxCards >= this.cardElements.length;
  });

  public cardElementSlice = computed<CardElement[]>(() => {
    const currentIndex: number = this.currentIndex();
    return this.cardElements.slice(currentIndex, currentIndex + this.maxCards);
  });

  public scrollCards(direction: 1 | -1): void {
    this.currentIndex.update((value: number) => value + direction);
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
