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

export interface Social {
  nome: string;
  descrizione: string;
  icona: string;
  colore: string;
  link: string;
}

export interface EditableSocial {
  key: string;
  link: string;
}

export interface Squadre {
  id: string;
  punteggio: number;
}
