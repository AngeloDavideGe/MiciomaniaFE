import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { DataHttp } from '../../../core/api/http.data';
import { Profilo } from '../../../shared/interfaces/http.interface';
import { BaseService } from '../../../shared/services/base/base.service';
import { Tweet, TweetAll } from '../components/shared/post.interface';
import { HttpParams } from '@angular/common/http';

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
    super('CS');
  }

  getProfiloById(idUtente: string): Observable<Profilo> {
    const params = new HttpParams().set('idUtente', idUtente);

    return this.getCustom<Profilo>('Posts/get_profilo', params);
  }

  getUltimiPosts(): Observable<TweetAll[]> {
    const params = new HttpParams()
      .set('time', DataHttp.postVisti.lastUpdated.toString())
      .set('maxPost', this.maxPostsVisible);

    return this.getCustom<TweetAll[]>('Posts/get_all_last_posts', params);
  }

  postPubblicazioni(tweet: Tweet): Observable<Tweet> {
    return this.postCustom<Tweet>('pubblicazioni', tweet);
  }

  deletePubblicazioni(tweetId: number): Observable<void> {
    return this.deleteCustom<void>('Posts/delete_post/' + tweetId);
  }
}
