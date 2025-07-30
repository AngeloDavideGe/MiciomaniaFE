import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Tweet } from '../interfaces/profilo.interface';
import { Profilo } from '../../../shared/interfaces/http.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfiloService {
  public aggiornamentoPic: boolean = false;

  constructor(private http: HttpClient) {}

  getProfiloById(userId: string): Observable<Profilo> {
    const url = environment.urlDB1 + 'rpc/get_profilo_by_id';
    const body = { p_id: userId };

    return this.http.post<Profilo>(url, body, {
      headers: environment.headerSupabase,
    });
  }

  postPubblicazioni(tweet: Tweet): Observable<Tweet> {
    const url = environment.urlDB1 + 'pubblicazioni';

    return this.http.post<Tweet>(url, tweet, {
      headers: environment.headerSupabase,
    });
  }

  deletePubblicazioni(tweetId: number): Observable<void> {
    const url = environment.urlDB1 + 'rpc/delete_pubblicazione_by_id';
    const body = { p_id: tweetId };

    return this.http.post<void>(url, body, {
      headers: environment.headerSupabase,
    });
  }

  uploadProfileImage(file: File, userId: string): Observable<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}.${fileExt}`;
    const filePath = `${fileName}`;

    return from(
      environment.supabaseClient1.storage
        .from('avatar')
        .upload(filePath, file, {
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

    const { data: publicData } = environment.supabaseClient1.storage
      .from('avatar')
      .getPublicUrl(filePath);

    if (!publicData?.publicUrl) {
      return throwError(() => new Error('URL pubblico non disponibile'));
    }

    return of(publicData.publicUrl + `?t=${Date.now()}`);
  }
}
