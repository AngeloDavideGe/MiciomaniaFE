export interface Messaggio extends MessaggioSend {
  id: number;
}

export interface MessaggioSend {
  chat_id: number;
  sender: string;
  content: string;
  created_at: Date;
  response: number | null;
  separator: boolean;
}

export interface MessaggioUpdate {
  id: number;
  sender: string;
  contentNew: string;
  contentOld: string;
  editated_at: Date;
  chat_id: number;
}

export interface GruppiChat {
  listaGruppi: Gruppo[];
  messaggi: Record<number, Messaggio[]>;
  messaggiCambiati: Record<number, MessaggioUpdate[]>;
  ultimoAggiornamento: Date;
  ultimoId: number;
}

export interface Gruppo {
  id: number;
  nome: string;
  pic: string;
}

export interface LastMess {
  content: string;
  orario: Date;
  chat: string;
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

export interface ReturnEditMessage {
  edited_message: MessaggioUpdate;
  original_message: Messaggio;
}

export interface ModificaInput {
  idMessaggio: number | null;
  content: string;
}
