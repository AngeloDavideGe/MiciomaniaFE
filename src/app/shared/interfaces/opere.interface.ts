export interface AllManga {
  listaManga: Manga[];
  micioManga: Manga[];
  mangaUtente: MangaUtente;
}

export interface Manga {
  id: number;
  nome: string;
  autore: string;
  genere: string;
  copertina: string;
  path: string;
  completato: true;
  capitoli: number;
}

export interface MangaUtente {
  preferiti: string;
  letti: string;
  completati: string;
}
