export interface MangaSong {
  idUtente: string;
  nome: string;
  genere: string;
  copertina: string;
  url: string;
}

export interface MangaParodia {
  mangaMiciomania: MangaSong[];
  mangaUtentePars: MangaSong[];
}

export interface CanzoniParodia {
  canzoniMiciomania: MangaSong[];
  canzoniUtente: MangaSong[];
}

export interface UtenteParodie {
  mangaUtente: MangaSong;
  canzoniUtente: MangaSong;
}

export interface Proposta extends MangaSong {
  tipo: string;
}
