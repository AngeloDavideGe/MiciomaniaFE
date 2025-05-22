import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Profilo, Tweet } from '../interfaces/profilo.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfiloService {
  public profiloPersonale: Profilo | null = null;
  public aggiornamentoPic: boolean = false;

  constructor(private http: HttpClient) {
    const pubblicazioniJSON = sessionStorage.getItem('pubblicazioni');
    if (pubblicazioniJSON) {
      this.profiloPersonale = JSON.parse(pubblicazioniJSON);
    }
  }

  getProfiloById(userId: string): Observable<any[]> {
    const url = environment.urlDB + 'rpc/get_profilo_by_id';
    const body = { p_id: userId };

    return this.http.post<any[]>(url, body, {
      headers: environment.defaultHeaders,
    });
  }

  postPubblicazioni(tweet: Tweet): Observable<Tweet> {
    const url = environment.urlDB + 'pubblicazioni';

    return this.http.post<Tweet>(url, tweet, {
      headers: environment.defaultHeaders,
    });
  }

  deletePubblicazioni(tweetId: number): Observable<void> {
    const url = environment.urlDB + 'rpc/delete_pubblicazione_by_id';
    const body = { p_id: tweetId };

    return this.http.post<void>(url, body, {
      headers: environment.defaultHeaders,
    });
  }

  uploadProfileImage(file: File, userId: string): Observable<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}.${fileExt}`;
    const filePath = `${fileName}`;

    return from(
      environment.supabase.storage.from('avatar').upload(filePath, file, {
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

    const { data: publicData } = environment.supabase.storage
      .from('avatar')
      .getPublicUrl(filePath);

    if (!publicData?.publicUrl) {
      return throwError(() => new Error('URL pubblico non disponibile'));
    }

    return of(publicData.publicUrl + `?t=${Date.now()}`);
  }
}
