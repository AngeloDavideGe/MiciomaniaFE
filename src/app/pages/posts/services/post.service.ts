import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { DataHttp } from '../../../core/api/http.data';
import { Profilo } from '../../../shared/interfaces/http.interface';
import { BaseService } from '../../../shared/services/base/base.service';
import { Tweet, TweetAll } from '../components/shared/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService extends BaseService {
  public aggiornamentoPic = signal<boolean>(false);
  public loadPostsBool: boolean = false;
  public oldPosts: TweetAll[] = structuredClone(DataHttp.postVisti.oldPosts);
  public newPosts: TweetAll[] = [];
  public readonly maxPostsVisible: number = 20;

  constructor() {
    super('DB1');
  }

  getProfiloById(userId: string): Observable<Profilo> {
    const body = { p_id: userId };

    return this.postCustom<Profilo>('rpc/get_profilo_by_id', body);
  }

  postPubblicazioni(tweet: Tweet): Observable<Tweet> {
    return this.postCustom<Tweet>('pubblicazioni', tweet);
  }

  deletePubblicazioni(tweetId: number): Observable<void> {
    const body = { p_id: tweetId };

    return this.postCustom<void>('rpc/delete_pubblicazione_by_id', body);
  }

  getUltimiPosts(): Observable<TweetAll[]> {
    const body = {
      last_updated: DataHttp.postVisti.lastUpdated,
      max_posts: this.maxPostsVisible,
    };

    return this.postCustom<TweetAll[]>('rpc/get_all_pubblicazioni', body);
  }
}
