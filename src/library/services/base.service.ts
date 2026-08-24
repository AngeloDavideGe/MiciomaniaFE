import {
  HttpClient,
  HttpContext,
  HttpContextToken,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export abstract class BaseService {
  protected http = inject(HttpClient);

  private readonly baseUrl: string;
  private readonly headers: HttpHeaders;

  constructor(config: BaseServiceConfig) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers || new HttpHeaders();
  }

  protected getCustom<T>(url: string, input?: HttpBaseInput): Observable<T> {
    const context: HttpContext = getContext(input?.contexts);

    return this.http.get<T>(`${this.baseUrl}${url}`, {
      headers: this.headers,
      params: input?.params,
      context: context,
    });
  }

  protected postCustom<T>(url: string, input?: HttpBaseInput): Observable<T> {
    const body: any = input?.body || {};
    const context: HttpContext = getContext(input?.contexts);

    return this.http.post<T>(`${this.baseUrl}${url}`, body, {
      headers: this.headers,
      context: context,
    });
  }

  protected putCustom<T>(url: string, input?: HttpBaseInput): Observable<T> {
    const body: any = input?.body || {};
    const context: HttpContext = getContext(input?.contexts);

    return this.http.put<T>(`${this.baseUrl}${url}`, body, {
      headers: this.headers,
      context: context,
    });
  }

  protected deleteCustom<T>(url: string, input?: HttpBaseInput): Observable<T> {
    const context: HttpContext = getContext(input?.contexts);

    return this.http.delete<T>(`${this.baseUrl}${url}`, {
      headers: this.headers,
      context: context,
    });
  }
}

export interface BaseServiceConfig {
  baseUrl: string;
  headers?: HttpHeaders;
}

function getContext(contexts: HttpContextInput[] = []): HttpContext {
  let context = new HttpContext();

  for (const item of contexts) {
    context = context.set(item.contextToken, item.value);
  }

  return context;
}

interface HttpBaseInput {
  body?: any;
  params?: HttpParams;
  contexts?: HttpContextInput[];
}

interface HttpContextInput {
  contextToken: HttpContextToken<boolean>;
  value: boolean;
}
