import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export abstract class BaseService<T> {
  protected http = inject(HttpClient);
  protected baseUrl: string = '';
  protected headers: HttpHeaders = {} as HttpHeaders;

  constructor(db: 'DB1' | 'DB2' | 'BE') {
    switch (db) {
      case 'DB1':
        this.baseUrl = environment.urlDB1;
        this.headers = environment.headerSupabase;
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

  // getAll(): Observable<T[]> {
  //   return this.http.get<T[]>(this.baseUrl);
  // }

  // post(item: T): Observable<T> {
  //   return this.http.post<T>(this.baseUrl, item);
  // }
}
