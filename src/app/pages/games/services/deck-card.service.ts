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
    const suits: string[] = ['H', 'D', 'C', 'S'];
    const values: string[] = [
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
    ];

    let index = 0;
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < values.length; j++) {
        frenchDeck[index++] = {
          code: values[j] + suits[i],
          image: urlCardFrancesi + values[j] + suits[i] + '.png',
        };
      }
    }

    this.pescataNoHttp = {
      deck_id: 'french-deck',
      cards: frenchDeck,
      remaining: frenchDeck.length,
    } as DrawDeck;
  }
}
