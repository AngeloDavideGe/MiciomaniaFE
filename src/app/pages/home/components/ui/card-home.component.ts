import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-home',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, NgClass],
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
          <div
            class="col-12 col-md-6 col-lg-4"
            *ngFor="let card of cardElements"
          >
            <div class="card h-100">
              <img [src]="card.link" class="card-img-top" alt="..." />
              <div class="card-body" [ngClass]="card.bgClass">
                <h5 class="card-title fw-bold">{{ card.titolo }}</h5>
                <p class="card-text">{{ card.descrizione }}</p>
                <a
                  *ngIf="!card.func; else noLink"
                  [routerLink]="card.aLink"
                  class="btn btn-light"
                  >{{ card.titoloBottone }}
                </a>
                <ng-template #noLink>
                  <a
                    class="btn btn-light"
                    (click)="card.func ? card.func() : null"
                  >
                    {{ card.titoloBottone }}
                  </a>
                </ng-template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CardHomeComponent {
  @Output() canzone = new EventEmitter<void>();

  public cardElements: CardElement[] = [
    {
      link: 'https://thesoundcheck.it/wp-content/uploads/2022/11/kono-manga-ga-sugoi-2021-migliori-riviste-manga-weekly-shonen-jump-secondo-v3-488235.jpg',
      descrizione:
        'Esplora il mondo dei manga di Miciomania (Parodie e non), cosi da capire come facciamo piangere le donne.',
      titolo: '📚 Manga Miciomania',
      titoloBottone: 'Manga',
      aLink: '/manga',
      bgClass: 'bg-success text-white',
      func: null,
    },
    {
      link: 'https://www.vice.com/wp-content/uploads/sites/2/2019/12/1577443774135-thumb_canzoni_internazionali.jpeg?w=1024',
      descrizione:
        'Immergiti nel mondo musicale di Miciomania: brani intensi che hanno toccato il cuore (e fatto versare qualche lacrima) a molte ascoltatrici.',
      titolo: '🎶 Musica Miciomania',
      titoloBottone: 'Ascolta',
      aLink: '/canzoni',
      bgClass: 'bg-danger text-white',
      func: () => this.canzone.emit(),
    },
    {
      link: 'https://www.flashgames.it/giochi/abilita/my.virtual.pet.shop/my.virtual.pet.shop.jpg',
      descrizione:
        'Prova i vari minigioghi Miciomani, non solo quelli con la quale tratti male una donna conoscente dei membri di Miciomania.',
      titolo: '🎮 Gioca con i sentimenti',
      titoloBottone: 'Giochi',
      aLink: '/games',
      bgClass: 'bg-warning text-dark',
      func: null,
    },
  ];
}

interface CardElement {
  link: string;
  descrizione: string;
  titolo: string;
  titoloBottone: string;
  aLink: string;
  bgClass: string;
  func: Function | null;
}
