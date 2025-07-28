import { Injectable } from '@angular/core';
import { CardDeck, DrawDeck } from '../interfaces/games.interfaces';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeckCardService {
  public pescataNoHttp: DrawDeck = {} as DrawDeck;

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
    this.pescataNoHttp.cards = frenchDeck;
  }
}
