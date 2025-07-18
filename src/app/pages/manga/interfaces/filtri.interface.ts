export interface TabsManga {
  class: string;
  href: string;
  color: string;
  testo: string;
  clickCall: Function;
}

export interface DettagliMangaInterface {
  titolo: string;
  messaggio: string;
  descrizione: string;
}

export interface PulsantiManga {
  click: Function;
  disabled: boolean;
  titolo: string;
  icona: string;
}
