import { Tweet } from '../../pages/posts/components/shared/post.interface';
import { MangaVolume } from '../../pages/manga/interfaces/manga.interface';
import { User } from './users.interface';

export enum Lingua {
  it = 'it',
  en = 'en',
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

export interface MangaUtente {
  preferiti: string;
  letti: string;
  completati: string;
}

export interface MangaAperto {
  nome: string;
  volumi: MangaVolume[];
}

export interface Profilo {
  user: User;
  tweets: Tweet[];
}
