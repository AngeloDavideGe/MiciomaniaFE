export interface MangaGet {
  manga: iManga;
  mangaUtente: MangaUtente;
}

export interface CanzoniGet {
  canzoni: Canzoni[];
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
  manga: string | null;
  mangamicio: string | null;
  canzonimicio: string | null;
}

export interface Canzoni {
  id: number;
  nome: string;
  autore: string;
  genere: string;
  copertina: string;
  path: string;
}

export interface OpereToolbar {
  icon: string;
  value: number;
  title: string;
}

export interface Classifica {
  squadre: Squadra[];
  giocatori: Giocatore[];
}

export interface Squadra {
  nome: string;
  punteggio: number;
  descrizione: string;
  colore: string;
}

export interface Giocatore {
  idUtente: string;
  punteggio: number;
  squadra: string;
}
