export interface Social {
  nome: string;
  descrizione: string;
  icona: string;
  colore: string;
  link: string;
}

export interface Quiz {
  domanda: string;
  risposte: Risposta[];
}

export interface Risposta {
  testo: string;
  soluzione: boolean;
}
