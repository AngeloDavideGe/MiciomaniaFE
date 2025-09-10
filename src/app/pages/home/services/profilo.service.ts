import { Injectable } from '@angular/core';
import { catchError, from, Observable, of, switchMap, throwError } from 'rxjs';
import { Profilo } from '../../../shared/interfaces/http.interface';
import { BaseService } from '../../../shared/services/base/base.service';
import { Tweet } from '../interfaces/profilo.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfiloService extends BaseService {
  public aggiornamentoPic: boolean = false;

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

  uploadProfileImage(file: File, userId: string): Observable<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}.${fileExt}`;
    const filePath = `${fileName}`;

    return from(
      this.appConfig.client.c1.storage.from('avatar').upload(filePath, file, {
        upsert: true,
        contentType: file.type,
      })
    ).pipe(
      switchMap(({ error }) => this.getLinkPic(error, filePath)),
      catchError((err) => {
        console.error('Errore Supabase:', err);
        return throwError(() => err);
      })
    );
  }

  private getLinkPic(error: any, filePath: string): Observable<string> {
    if (error) return throwError(() => error);

    const { data: publicData } = this.appConfig.client.c1.storage
      .from('avatar')
      .getPublicUrl(filePath);

    if (!publicData?.publicUrl) {
      return throwError(() => new Error('URL pubblico non disponibile'));
    }

    return of(publicData.publicUrl + `?t=${Date.now()}`);
  }
}
