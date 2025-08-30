import { Component, effect, EventEmitter, Output } from '@angular/core';
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
      <div class="container">
        <div class="text-center mb-5">
          <h4 class="fw-bold display-4">Home - Miciomania</h4>
        </div>
        <div class="row g-4">
          @for (card of cardElements; track $index) {
          <div class="col-12 col-md-6 col-lg-4">
            <div class="card h-100">
              <img [src]="card.link" class="card-img-top" alt="..." />
              <div class="card-body" [class]="card.bgClass">
                <h5 class="card-title fw-bold">{{ card.titolo[lingua] }}</h5>
                <p class="card-text">
                  {{ card.descrizione[lingua] }}
                </p>
                @if(!card.func) {
                <a [routerLink]="card.aLink" class="btn btn-light">
                  {{ card.titoloBottone[lingua] }}
                </a>
                } @else {
                <a
                  class="btn btn-light"
                  (click)="card.func ? card.func() : null"
                >
                  {{ card.titoloBottone[lingua] }}
                </a>
                }
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class CardHomeComponent {
  public lingua: Lingua = Lingua.it;

  @Output() canzone = new EventEmitter<void>();

  constructor() {
    effect(() => (this.lingua = DataHttp.lingua()));
  }

  public cardElements: CardElement[] = [
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
