import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export abstract class BaseService {
  private http = inject(HttpClient);
  private baseUrl: string = '';
  private headers: HttpHeaders = {} as HttpHeaders;

  constructor(db: 'DB1' | 'DB2' | 'BE') {
    switch (db) {
      case 'DB1':
        this.baseUrl = environment.urlDB1;
        this.headers = environment.headerSupabase1;
        break;
      case 'DB2':
        this.baseUrl = environment.urlDB2;
        this.headers = environment.headerSupabase2;
        break;
      case 'BE':
        this.baseUrl = environment.urlBE;
        this.headers = environment.headerBEMiciomania;
        break;
    }
  }

  protected getCustom<T>(url: string, params?: HttpParams): Observable<T[]> {
    if (params) {
      return this.http.get<T[]>(`${this.baseUrl}${url}`, {
        headers: this.headers,
        params: params,
      });
    } else {
      return this.http.get<T[]>(`${this.baseUrl}${url}`, {
        headers: this.headers,
      });
    }
  }

  protected postCustom<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${url}`, body, {
      headers: this.headers,
    });
  }

  protected patchCustom<T>(
    url: string,
    body: any,
    params: HttpParams
  ): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${url}`, body, {
      headers: this.headers,
      params: params,
    });
  }
}
