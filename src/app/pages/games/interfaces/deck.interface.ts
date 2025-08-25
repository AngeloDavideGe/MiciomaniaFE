export interface Deck {
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

export class DefaultDeck {
  deck_id: string;
  shuffled: boolean;
  remaining: number;

  constructor(deck_id: string, count: number) {
    this.deck_id = deck_id;
    this.shuffled = true;
    this.remaining = 52 - count;
  }
}

export interface DrawDeck {
  deck_id: string;
  cards: CardDeck[];
  remaining: number;
}

export interface CardDeck {
  code: string;
  image: string;
}

export interface PescataDeck {
  drawnCards: CardDeck[];
  remainingDeck: CardDeck[];
}
