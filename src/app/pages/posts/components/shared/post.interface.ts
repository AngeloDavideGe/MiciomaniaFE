export interface TweetAll extends Tweet {
  utenteNome: string;
  utenteAvatar: string;
}

export interface Tweet {
  id: number;
  testo: string;
  dataCreazione: Date;
  idUtente: number;
  immaginePost: string;
}
