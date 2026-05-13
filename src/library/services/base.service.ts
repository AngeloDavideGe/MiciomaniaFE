import {
  HttpClient,
  HttpContext,
  HttpContextToken,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppConfigService } from '../../app/core/api/appConfig.service';

export abstract class BaseService {
  protected http = inject(HttpClient);
  protected appConfig = inject(AppConfigService);

  private baseUrl: string = '';
  private headers: HttpHeaders = {} as HttpHeaders;

  constructor(db: 'CS' | 'PY' | 'DB2') {
    this.baseUrl = environment.BE[db];
    this.headers = getHeader(this.appConfig.config.HEADERS[db].KEY);
  }

  protected getCustom<T>(
    url: string,
    params: HttpParams,
    contextToken?: HttpContextToken<boolean>,
  ): Observable<T> {
    let context = new HttpContext();

    if (contextToken) {
      context = context.set(contextToken, true);
    }

    return this.http.get<T>(`${this.baseUrl}${url}`, {
      headers: this.headers,
      params: params,
      context: context,
    });
  }

  protected postCustom<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${url}`, body, {
      headers: this.headers,
    });
  }

  protected putCustom<T>(
    url: string,
    body: any,
    contextToken?: HttpContextToken<boolean>,
  ): Observable<T> {
    let context = new HttpContext();

    if (contextToken) {
      context = context.set(contextToken, true);
    }

    return this.http.put<T>(`${this.baseUrl}${url}`, body, {
      headers: this.headers,
      context: context,
    });
  }

  protected deleteCustom<T>(
    url: string,
    contextToken?: HttpContextToken<boolean>,
  ): Observable<T> {
    let context = new HttpContext();

    if (contextToken) {
      context = context.set(contextToken, true);
    }

    return this.http.delete<T>(`${this.baseUrl}${url}`, {
      headers: this.headers,
      context: context,
    });
  }
}

function getHeader(key: string): HttpHeaders {
  return new HttpHeaders({
    apikey: key,
    Authorization: `Bearer ${key}`,
  });
}
