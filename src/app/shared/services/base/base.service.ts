import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AppConfigService } from '../../../core/api/appConfig.service';

export abstract class BaseService {
  protected http = inject(HttpClient);
  public appConfig = inject(AppConfigService);

  private baseUrl: string = '';
  private headers: HttpHeaders = {} as HttpHeaders;

  constructor(db: 'DB1' | 'DB2' | 'BE') {
    this.baseUrl = environment[db];
    this.headers = getHeader(this.appConfig.config[db].KEY);
  }

  protected getCustom<T>(url: string, params: HttpParams): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}${url}`, {
      headers: this.headers,
      params: params,
    });
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

  protected getCustomBE<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${url}`, {
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
