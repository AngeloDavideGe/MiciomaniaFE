import { Quiz } from '../../../shared/interfaces/github.interface';

export type EsitoGame = 'vittoria' | 'sconfitta' | 'pareggio';
export type Turno = 'Player' | 'Bot';

export interface CardGioco {
  nome: string;
  descrizione: string;
  linkImg: string;
  routerLink: string;
}

export interface SquadreGiocatore {
  personale: SquadraGioco[];
  avversario: SquadraGioco[];
}

export interface SquadraGioco {
  nome: string;
  punteggio: number | string;
}

// TRIS
export interface TrisCell {
  player: boolean;
  bot: boolean;
}

// FORZA 4
export interface Forza4 {
  player: boolean;
  bot: boolean;
}

// QUIZ
export interface CasualQuiz {
  quiz: Quiz;
  index: number;
}

// BATTAGLIA NAVALE
export interface Nave {
  numNavi: number;
  lunghezzaNave: number;
  keyCell: keyof CelleBattaglia;
  tipoNave: 'navePiccola' | 'naveGrande';
}

export interface CelleBattaglia {
  cellaPlayer: NavaleCell[][];
  cellaBot: NavaleCell[][];
}

export interface NavaleCell {
  navePiccola: boolean;
  naveGrande: boolean;
  cellaColpita: boolean;
}

export interface BotPlay {
  cella: NavaleCell[][];
  dimGriglia: number;
}

export interface PosizionaNave {
  riga: number;
  colonna: number;
  dimGriglia: number;
  celle: CelleBattaglia;
  nave: Nave;
}

export interface CellaOccupata {
  i: number;
  j: number;
  key: keyof CelleBattaglia;
}

// DECK
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
