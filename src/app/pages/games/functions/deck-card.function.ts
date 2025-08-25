import { CardDeck, PescataDeck } from '../interfaces/deck.interface';

export function getCasualCard(
  cardsDeck: CardDeck[],
  numCards: number,
  numCoppie: number,
  rimuoviCarte: boolean
): PescataDeck | CardDeck[] {
  const baseCards: CardDeck[] = [];
  let indexUsed = new Set<number>();
  let deckLength: number = cardsDeck.length;

  for (let i = 0; i < numCards && deckLength > 0; i++) {
    let randomIndex: number;

    do {
      randomIndex = Math.floor(Math.random() * cardsDeck.length);
    } while (indexUsed.has(randomIndex));

    for (let j = 0; j < numCoppie; j++) {
      baseCards.push(cardsDeck[randomIndex]);
    }

    indexUsed.add(randomIndex);
    deckLength -= 1;
  }

  if (rimuoviCarte) {
    return rimozioneCard(cardsDeck, indexUsed, baseCards);
  }

  return shuffleArray<CardDeck>(baseCards);
}

function rimozioneCard(
  cardsDeck: CardDeck[],
  indexUsed: Set<number>,
  baseCards: CardDeck[]
): PescataDeck {
  const remainingDeck = cardsDeck.filter(
    (x, index: number) => !indexUsed.has(index)
  );

  return {
    drawnCards: shuffleArray(baseCards),
    remainingDeck: remainingDeck,
  } as PescataDeck;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled: T[] = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
