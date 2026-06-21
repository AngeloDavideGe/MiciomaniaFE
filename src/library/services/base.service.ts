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

  private baseUrl: string;
  private headers: HttpHeaders;

  constructor(db: 'CS' | 'PY' | 'DB2') {
    this.baseUrl = environment.BE[db];
    this.headers = getHeader(this.appConfig.config.HEADERS[db].KEY);
  }

  protected getCustom<T>(url: string, input?: HttpBaseInput): Observable<T> {
    const context = getContext(input?.contextToken, input?.valueContext);

    return this.http.get<T>(`${this.baseUrl}${url}`, {
      headers: this.headers,
      params: input?.params,
      context: context,
    });
  }

  protected postCustom<T>(url: string, input?: HttpBaseInput): Observable<T> {
    const body = input?.body || {};
    const context = getContext(input?.contextToken, input?.valueContext);

    return this.http.post<T>(`${this.baseUrl}${url}`, body, {
      headers: this.headers,
      context: context,
    });
  }

  protected putCustom<T>(url: string, input?: HttpBaseInput): Observable<T> {
    const body = input?.body || {};
    const context = getContext(input?.contextToken, input?.valueContext);

    return this.http.put<T>(`${this.baseUrl}${url}`, body, {
      headers: this.headers,
      context: context,
    });
  }

  protected deleteCustom<T>(url: string, input?: HttpBaseInput): Observable<T> {
    const context = getContext(input?.contextToken, input?.valueContext);

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

function getContext(
  contextToken?: HttpContextToken<boolean>,
  value?: boolean,
): HttpContext {
  let context = new HttpContext();

  if (contextToken && value != undefined) {
    context = context.set(contextToken, value);
  }

  return context;
}

interface HttpBaseInput {
  body?: any;
  params?: HttpParams;
  contextToken?: HttpContextToken<boolean>;
  valueContext?: boolean;
}
