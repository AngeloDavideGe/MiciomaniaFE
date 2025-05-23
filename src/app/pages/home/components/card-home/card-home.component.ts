import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
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
                  *ngIf="card.aLink"
                  [routerLink]="card.aLink"
                  class="btn btn-light"
                  >{{ card.titoloBottone }}</a
                >
                <span *ngIf="!card.aLink" class="btn btn-danger">{{
                  card.titoloBottone
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CardHomeComponent {
  public cardElements: CardElement[] = [
    {
      link: 'https://hd2.tudocdn.net/1110659?w=824&h=494',
      descrizione:
        'Apri la chat del gruppo Miciomania, deridi e umilia numerose persone che Indy kun e i suoi fedeli compagni incontrano su Fortinte.',
      titolo: '💬 Chatta con i Miciomani',
      titoloBottone: 'Chat',
      aLink: '/chat-group',
      bgClass: 'bg-primary text-white',
    },
    {
      link: 'https://thesoundcheck.it/wp-content/uploads/2022/11/kono-manga-ga-sugoi-2021-migliori-riviste-manga-weekly-shonen-jump-secondo-v3-488235.jpg',
      descrizione:
        'Esplora il mondo dei manga di Miciomania (Parodie e non), cosi da capire come facciamo piangere le donne.',
      titolo: '📚 Manga Miciomania',
      titoloBottone: 'Manga',
      aLink: '/manga',
      bgClass: 'bg-success text-white',
    },
    {
      link: 'https://www.flashgames.it/giochi/abilita/my.virtual.pet.shop/my.virtual.pet.shop.jpg',
      descrizione:
        'Prova i vari minigioghi Miciomani, non solo quelli con la quale tratti male una donna conoscente dei membri di Miciomania.',
      titolo: '🎮 Gioca con i sentimenti',
      titoloBottone: 'Giochi',
      aLink: '/games',
      bgClass: 'bg-warning text-dark',
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
}
