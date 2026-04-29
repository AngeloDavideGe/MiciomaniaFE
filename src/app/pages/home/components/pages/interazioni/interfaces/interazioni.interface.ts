export interface Interazione {
  id: number;
  user1: string;
  user2: string;
  conteggio: number;
  ultimoInvio: Date;
}

export interface InterazioniPaginate {
  elems: Interazione[];
  totElems: number;
  totPags: number;
}
