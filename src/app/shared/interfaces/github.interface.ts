import { Lingua } from './http.interface';

export type GitHubType = Social[] | Conquiste;

export interface Social {
  nome: string;
  descrizione: Record<Lingua, string>;
  icona: string;
  colore: string;
  link: string;
}

export interface Risposta {
  testo: string;
  soluzione: boolean;
}

export interface Mappa {
  proprietario: string;
  descrizione: string;
}

export interface Conquiste {
  conquistatori: Record<string, string>;
  territori: Record<string, Mappa>;
  muscoli: Record<string, Mappa>;
}
