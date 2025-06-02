export interface ElementiUtente {
  manga: MangaMiciomania;
  canzone: CanzoniMiciomania;
  proposta: Proposta;
}

export interface MangaMiciomania {
  id_autore: string;
  nome: string;
  genere: string;
  copertina: string;
  link: string;
}

export interface CanzoniMiciomania {
  id_autore: string;
  nome: string;
  genere: string;
  copertina: string;
  link: string;
}

export interface Proposta {
  id_autore: string;
  nome: string;
  genere: string;
  copertina: string;
  link: string;
  tipo: string;
}
