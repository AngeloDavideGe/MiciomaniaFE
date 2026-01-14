import { Tweet } from '../../pages/posts/components/shared/post.interface';
import { User } from './users.interface';

export enum Lingua {
  it = 'it',
  en = 'en',
}

export interface MangaUtente {
  preferiti: string;
  letti: string;
  completati: string;
}

export interface Profilo {
  user: User;
  tweets: Tweet[];
}
