export interface TweetAll extends Tweet {
  userName: string;
  userProfilePic: string;
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
