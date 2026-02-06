export interface TweetAll extends Tweet {
  nome: string;
  profilePic: string;
}

export interface Tweet {
  id: number;
  dataCreazione: Date;
  testo: string;
  idUtente: string;
  immaginePost: string;
}

export interface Posts {
  oldPosts: TweetAll[];
  lastUpdated: Date;
}
