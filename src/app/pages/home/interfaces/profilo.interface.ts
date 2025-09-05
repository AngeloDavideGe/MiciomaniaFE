export interface Tweet {
  id: number;
  testo: string;
  dataCreazione: Date;
  idUtente: number;
}

export interface EditableSocial {
  key: string;
  link: string;
}

export interface Squadre {
  id: string;
  punteggio: number;
}

export type componenteApertoType = 'cursore' | 'profili' | '';
export type modaleApertaType = 'new-tweet' | 'edit-profilo' | 'change-pic' | '';
