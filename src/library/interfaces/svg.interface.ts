export interface PathSvgCustom {
  title: string;
  d: string;
  fill?: string;
  textX?: number;
  textY?: number;
  click?: Function;
}

export interface DatiSvg {
  titolo: string;
  valore: number;
  colore?: string;
  click?: Function;
}

export interface Mappa {
  proprietario: string;
  descrizione: string;
}

export interface SvgBar {
  larghezzaMassima?: number;
  altezzaBarra?: number;
  spazio?: number;
  margine?: number;
}

export interface SvgCircle {
  centro?: number;
  raggio?: number;
  simmetrico?: boolean;
  raggioBuco?: number;
}
