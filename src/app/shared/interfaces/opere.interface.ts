export interface AllManga extends iManga {
  mangaUtente: MangaUtente;
}

export interface iManga {
  listaManga: Manga[];
  micioManga: Manga[];
}

export interface Manga {
  id: number;
  nome: string;
  autore: string;
  genere: string;
  copertina: string;
  path: string;
  completato: boolean;
  capitoli: number;
}

export interface MangaUtente {
  preferiti: string;
  letti: string;
  completati: string;
}
