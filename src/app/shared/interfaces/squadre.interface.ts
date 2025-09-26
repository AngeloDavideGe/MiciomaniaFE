export interface Classifica {
  squadre: Squadre[];
  topUser: TopUser[];
}

export interface Squadre {
  id: string;
  punteggio: number;
}

export interface TopUser {
  id: string;
  team: string;
  punteggio: number;
}
