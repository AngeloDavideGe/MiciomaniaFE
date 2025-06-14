import { CardDeck } from '../interfaces/games.interfaces';

export function getCardsDisponibili(
  cardDeck: CardDeck[],
  numCards: number
): CardDeck[] {
  const baseCards = [...cardDeck]
    .sort(() => Math.random() - 0.5)
    .slice(0, numCards);

  return shuffleArray([...baseCards, ...baseCards]);
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
