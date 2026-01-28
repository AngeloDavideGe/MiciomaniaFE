import { Lingua } from '../../../shared/interfaces/http.interface';

export interface TabsManga {
  class: string;
  href: string;
  color: string;
  testo: Record<Lingua, string>;
  clickCall: Function;
}

export interface DettagliMangaInterface {
  titolo: string;
  messaggio: string;
  descrizione: string;
}
