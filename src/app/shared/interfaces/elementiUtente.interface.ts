export interface ElementiUtente {
  manga: MangaMiciomania;
  canzoni: CanzoniMiciomania;
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
  id_utente: string;
  tipo: string;
  nome: string;
  descrizione: string;
  copertina: string;
  file: string;
}
