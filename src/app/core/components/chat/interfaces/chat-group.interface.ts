import { WritableSignal } from '@angular/core';

export interface Messaggio {
  id: number;
  chat_id: number;
  sender: string;
  content: string;
  created_at: string;
  response: number | null;
}

export interface MessaggioSend {
  chat_id: number;
  sender: string;
  content: string;
  created_at: string;
  response: number | null;
}

export interface GruppiChat {
  listaGruppi: Gruppo[];
  messaggi: Record<number, Messaggio[]>;
}

export interface Gruppo {
  id: number;
  nome: string;
}

export interface RispostaInput {
  idMessaggio: number;
  idUser: string;
  content: string;
}

export interface UserReduced {
  nome: string;
  pic: string;
}

export interface IMessaggioComponent {
  message: Messaggio;
  name: string;
  replySender: string;
  replyText: string;
  urlPic: string;
  class2: 'sent' | 'received';
}

export interface DropDownAperta {
  messaggioAperto: number | null;
  dropdown: DropDownMessaggi[];
}

export interface DropDownMessaggi {
  titolo: string;
  click: Function;
  cond: boolean;
}

export interface OutputDropdown {
  idMessaggio: number;
  idUser: string;
}
