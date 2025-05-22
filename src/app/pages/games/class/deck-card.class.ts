import { inject } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import {
  CardDeck,
  DefaultDeck,
  DrawDeck,
} from '../interfaces/games.interfaces';
import { DeckCardService } from '../services/deck-card.service';
import { environment } from '../../../../environments/environment';

export class DeckCardClass {
  private deckCardService = inject(DeckCardService);

  public setAllCards(): void {
    let frenchDeck: CardDeck[] = [];

    for (const suit of ['H', 'D', 'C', 'S']) {
      for (const value of [
        'A',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',
        'J',
        'Q',
        'K',
      ]) {
        frenchDeck.push({
          code: value + suit,
          image: environment.urlCardFrancesi + value + suit + '.png',
        });
      }
    }
    this.deckCardService.pescataNoHttp.cards = frenchDeck;
  }

  public drawCards(count: number): void {
    const deck = this.deckCardService.deckHttp;

    if (deck.deck_id && deck.remaining >= count) {
      this.drawCardsCustom({
        httpCall: () => this.deckCardService.getRandomCards(count),
        nextCall: () => (this.deckCardService.deckHttp.remaining -= count),
      });
    } else {
      this.drawCardsCustom({
        httpCall: () => this.deckCardService.getDeckAndDrawCards(count),
        nextCall: (data) =>
          (this.deckCardService.deckHttp = new DefaultDeck(
            data.deck_id,
            count
          )),
      });
    }
  }

  private drawCardsCustom(params: {
    httpCall: () => Observable<any>;
    nextCall: (data: DrawDeck) => void;
  }): void {
    params
      .httpCall()
      .pipe(
        take(1),
        map((data: any) => this.mapDrawDeck(data))
      )
      .subscribe({
        next: (data: DrawDeck) => {
          this.deckCardService.pescataHttp = data;
          params.nextCall(data);
        },
        error: (err) => console.error('errore nel pescaggio', err),
      });
  }

  private mapDrawDeck(response: any): DrawDeck {
    return {
      deck_id: response.deck_id,
      cards: response.cards.map((card: any) => ({
        code: card.code,
        image: card.image,
      })),
      remaining: response.remaining,
    };
  }
}
