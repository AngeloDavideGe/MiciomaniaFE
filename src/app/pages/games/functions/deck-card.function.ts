import { CardDeck } from '../interfaces/games.interfaces';

export function getCardsDisponibili(
  cardDeck: CardDeck[],
  numCards: number
): CardDeck[] {
  const baseCards: CardDeck[] = [];
  const deckCopy = [...cardDeck];

  for (let i = 0; i < numCards && deckCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * deckCopy.length);
    const selectedCard = deckCopy[randomIndex];
    baseCards.push(selectedCard, selectedCard);
    deckCopy.splice(randomIndex, 1);
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
