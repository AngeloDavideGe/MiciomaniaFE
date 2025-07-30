import {
  ListaManga,
  MangaUtente,
} from '../../../shared/interfaces/http.interface';

export interface ListaEUtenti {
  lista_manga: ListaManga[];
  manga_utente: MangaUtente[];
}

export interface MangaENome {
  info_manga: InfoManga;
  volumi: MangaVolume[];
}

export interface MangaVolume {
  id: number;
  link: string;
}

export interface InfoManga {
  nome: string;
  completato: boolean;
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
