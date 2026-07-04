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
