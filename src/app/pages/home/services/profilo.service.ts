import { Injectable, signal } from '@angular/core';
import { from, Observable, of, switchMap } from 'rxjs';
import { Profilo } from '../../../shared/interfaces/http.interface';
import { BaseService } from '../../../shared/services/base/base.service';
import { Tweet } from '../interfaces/profilo.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfiloService extends BaseService {
  public aggiornamentoPic = signal<boolean>(false);

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
}
