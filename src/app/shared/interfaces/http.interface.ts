import { MangaVolume } from '../../pages/manga/interfaces/manga.interface';

export interface ListaManga {
  id: number;
  nome: string;
  autore: string;
  genere: string;
  copertina: string;
  path: string;
  completato: boolean;
}

export interface MangaUtente {
  preferiti: string;
  letti: string;
  completati: string;
}

export interface MangaAperto {
  nome: string;
  volumi: MangaVolume[];
}
