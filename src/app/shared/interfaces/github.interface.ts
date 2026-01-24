import { Lingua } from './http.interface';

export type GitHubType = Social[] | Quiz[] | MN[] | Conquiste;

export interface Social {
  nome: string;
  descrizione: Record<Lingua, string>;
  icona: string;
  colore: string;
  link: string;
}

export interface Quiz {
  domanda: string;
  risposte: Risposta[];
}

export interface Risposta {
  testo: string;
  soluzione: boolean;
}

export interface MN {
  valore: string | number;
  descrizione: string;
  consiglio: string;
  esempi: string[];
  colore: string;
}

export interface Mappa {
  proprietario: string;
  descrizione: string;
}

export interface Conquiste {
  conquistatori: Record<string, string>;
  territori: Record<string, Mappa>;
}
