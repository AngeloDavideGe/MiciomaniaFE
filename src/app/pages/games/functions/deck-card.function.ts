import { CardDeck } from '../interfaces/games.interfaces';

export function get2NCasualCard(
  cardDeck: CardDeck[],
  numCards: number
): CardDeck[] {
  const baseCards: CardDeck[] = [];
  let indexUsed: Set<number> = new Set();
  let deckLength: number = cardDeck.length;

  for (let i = 0; i < numCards && deckLength > 0; i++) {
    let randomIndex: number;

    do {
      randomIndex = Math.floor(Math.random() * cardDeck.length);
    } while (indexUsed.has(randomIndex));

    const selectedCard: CardDeck = cardDeck[randomIndex];
    baseCards.push(selectedCard, selectedCard);
    deckLength -= 1;
  }

  return shuffleArray(baseCards);
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
