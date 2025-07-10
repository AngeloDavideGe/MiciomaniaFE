export interface ListaEUtenti {
  lista_manga: ListaManga[];
  manga_utente: MangaUtente[];
}

export interface ListaManga {
  id: number;
  nome: string;
  autore: string;
  genere: string;
  copertina: string;
  path: string;
  completato: boolean;
}

export interface MangaVolume {
  id: number;
  link: string;
}

export interface MangaUtente {
  preferiti: string;
  letti: string;
  completati: string;
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
