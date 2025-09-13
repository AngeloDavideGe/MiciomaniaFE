export interface Messaggio {
  id: number;
  chat_id: string;
  sender: string;
  content: string;
  created_at: string;
  response: number | null;
}

export interface MessaggioSend {
  chat_id: string;
  sender: string;
  content: string;
  created_at: string;
  response: number | null;
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
  dropdown: DropDownMessaggi[];
  messaggioAperto: number;
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
