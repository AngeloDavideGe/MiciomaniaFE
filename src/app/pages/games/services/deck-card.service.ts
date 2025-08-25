import { Injectable } from '@angular/core';
import { DrawDeck, CardDeck } from '../interfaces/deck.interface';

@Injectable({
  providedIn: 'root',
})
export class DeckCardService {
  public pescataNoHttp: DrawDeck = {} as DrawDeck;

  public setAllCards(): void {
    const urlCardFrancesi: string = 'https://deckofcardsapi.com/static/img/';
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
          image: urlCardFrancesi + value + suit + '.png',
        });
      }
    }

    this.pescataNoHttp = {
      deck_id: 'french-deck',
      cards: frenchDeck,
      remaining: frenchDeck.length,
    } as DrawDeck;
  }
}
