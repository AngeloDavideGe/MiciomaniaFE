import { Injectable, signal } from '@angular/core';
import { BaseService } from '../../../../../../shared/services/base/base.service';
import {
  Interazione,
  InterazioniPaginate,
} from '../interfaces/interazioni.interface';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InterazioniService extends BaseService {
  public allInterazioni = signal<Interazione[]>([]);
  public interazioniPersonali = signal<Interazione[]>([]);

  constructor() {
    super('CS');
  }

  getAllInterazioni(): Observable<Interazione[]> {
    const params = new HttpParams();

    return this.getCustom<Interazione[]>(
      'Interazioni/get_all_interazioni',
      params,
    );
  }

  getInterazioniPersonali(idUtente: string): Observable<Interazione[]> {
    const params = new HttpParams();

    return this.getCustom<Interazione[]>(
      `Interazioni/get_interazioni_by_id/${idUtente}`,
      params,
    );
  }

  getInterazioniPaginate(
    el: number,
    num: number,
    ord: 'cresc' | 'desc',
    key: string,
  ): Observable<InterazioniPaginate> {
    const params = new HttpParams()
      .set('elemForPage', el)
      .set('numPag', num)
      .set('order', ord)
      .set('orderKey', key);

    return this.getCustom<InterazioniPaginate>(
      'Interazioni/get_interazioni_paginate',
      params,
    );
  }

  upsertInterazione(user1: string, user2: string): Observable<void> {
    const orderUser: string[] = [user1, user2].sort((a: string, b: string) =>
      a.localeCompare(b),
    );

    const body = {
      user1: orderUser[0],
      user2: orderUser[1],
    };

    return this.postCustom<void>('Interazioni/upsert_interazione', body);
  }
}
