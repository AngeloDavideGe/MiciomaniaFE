import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AppConfigService } from '../../../core/api/appConfig.service';

export abstract class BaseService {
  protected http = inject(HttpClient);
  protected appConfig = inject(AppConfigService);

  private baseUrl: string = '';
  private headers: HttpHeaders = {} as HttpHeaders;

  constructor(db: 'CS' | 'PY' | 'DB2') {
    this.baseUrl = environment.BE[db];
    this.headers = getHeader(this.appConfig.config[db].KEY);
  }

  protected getCustom<T>(url: string, params: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${url}`, {
      headers: this.headers,
      params: params,
    });
  }

  protected postCustom<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${url}`, body, {
      headers: this.headers,
    });
  }

  protected putCustom<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${url}`, body, {
      headers: this.headers,
    });
  }

  protected deleteCustom<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${url}`, {
      headers: this.headers,
    });
  }
}

function getHeader(key: string): HttpHeaders {
  return new HttpHeaders({
    apikey: key,
    Authorization: `Bearer ${key}`,
  });
}
