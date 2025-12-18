export interface Classifica {
  squadre: Squadre[];
  giocatori: Giocatori[];
}

export interface Squadre {
  nome: string;
  punteggio: number;
  descrizione: string;
  colore: string;
}

export interface Giocatori {
  idUtente: string;
  punteggio: number;
  squadra: string;
}
