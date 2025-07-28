import { User } from '../../../shared/interfaces/users.interface';

export interface Profilo {
  user: User;
  tweets: Tweet[];
}

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
