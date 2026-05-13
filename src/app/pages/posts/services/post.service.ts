import { HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { LOADING_CONTEXT } from '../../../../library/interceptors/loading.interceptor';
import { BaseService } from '../../../../library/services/base.service';
import { DataHttp } from '../../../core/api/http.data';
import { Profilo } from '../../../shared/interfaces/http.interface';
import { Tweet, TweetAll } from '../components/shared/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService extends BaseService {
  public aggiornamentoPic = signal<boolean>(false);
  public loadPostsBool: boolean = false;
  public oldPosts: TweetAll[] = structuredClone(DataHttp.postVisti.oldPosts);
  public newPosts: TweetAll[] = [];
  public allPosts = signal<TweetAll[]>(this.oldPosts);

  constructor() {
    super('CS');
  }

  getProfiloById(idUtente: string): Observable<Profilo> {
    const params = new HttpParams().set('idUtente', idUtente);

    return this.getCustom<Profilo>('Posts/get_profilo', {
      params: params,
      contextToken: LOADING_CONTEXT,
    });
  }

  getUltimiPosts(): Observable<TweetAll[]> {
    const params = new HttpParams()
      .set('time', DataHttp.postVisti.lastUpdated.toString())
      .set('maxPost', this.appConfig.config.maxElement.postVisible);

    return this.getCustom<TweetAll[]>('Posts/get_all_last_posts', {
      params: params,
    });
  }

  postPubblicazioni(tweet: Tweet): Observable<Tweet> {
    const body = {
      testo: tweet.testo,
      idUtente: tweet.idUtente,
      immaginePost: 'aaa',
    };

    return this.postCustom<Tweet>('Posts/post_tweet', { body: body });
  }

  updatePubblicazioni(tweet: Tweet): Observable<Tweet> {
    const body = {
      testo: tweet.testo,
      idUtente: tweet.idUtente,
      immaginePost: 'aaa',
    };

    return this.postCustom<Tweet>(`Posts/update_tweet/${tweet.id}`, {
      body: body,
    });
  }

  deletePubblicazioni(tweetId: number): Observable<void> {
    return this.deleteCustom<void>(`Posts/delete_post/${tweetId}`, {
      contextToken: LOADING_CONTEXT,
    });
  }
}
