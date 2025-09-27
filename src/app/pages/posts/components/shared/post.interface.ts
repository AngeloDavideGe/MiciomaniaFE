export interface TweetAll extends Tweet {
  nome: string;
  profilePic: string;
}

export interface Tweet {
  id: number;
  dataCreazione: Date;
  testo: string;
  idUtente: number;
  immaginePost: string;
}

export interface Posts {
  oldPosts: TweetAll[];
  lastUpdated: Date;
}
