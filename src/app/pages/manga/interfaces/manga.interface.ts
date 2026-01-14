import { MangaUtente } from '../../../shared/interfaces/http.interface';

export interface ListaManga {
  id: number;
  nome: string;
  autore: string;
  genere: string;
  copertina: string;
  path: string;
  completato: boolean;
}

export interface ListaEUtenti {
  listaManga: ListaManga[];
  mangaUtente: MangaUtente;
}

export interface SplitMangaUtente {
  preferiti: number[];
  letti: number[];
  completati: number[];
}

export interface SezioniMangaUtente {
  preferiti: ListaManga[];
  letti: ListaManga[];
  completati: ListaManga[];
}

export type keyofMangaUtente =
  | keyof MangaUtente
  | keyof SplitMangaUtente
  | keyof SezioniMangaUtente;
