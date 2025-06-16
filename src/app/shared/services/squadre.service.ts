import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Squadre } from '../../pages/home/interfaces/profilo.interface';

@Injectable({
  providedIn: 'root',
})
export class SquadreService {
  public squadre: Squadre[] = [];
  public punteggioOttenuto: number = 0;

  constructor(private http: HttpClient) {
    sessionStorage.setItem(
      'punteggioOttenuto',
      JSON.stringify(this.punteggioOttenuto)
    );
  }

  get getPunteggioOttenuto(): number {
    const punteggio = sessionStorage.getItem('punteggioOttenuto');
    if (punteggio) {
      this.punteggioOttenuto = JSON.parse(punteggio);
    }
    return this.punteggioOttenuto;
  }

  set setPunteggioOttenuto(punteggio: number) {
    if (punteggio == 0) {
      this.punteggioOttenuto = 0;
    } else {
      this.punteggioOttenuto += punteggio;
    }
    sessionStorage.setItem(
      'punteggioOttenuto',
      JSON.stringify(this.punteggioOttenuto)
    );
  }

  getSquadre(): Observable<Squadre[]> {
    const url = environment.urlDB + 'squadre';
    return this.http.get<Squadre[]>(url, {
      headers: environment.headerSupabase,
    });
  }

  updatePunteggioSquadra(
    userId: string,
    nomeSquadra: string[]
  ): Observable<void> {
    const url = environment.urlDB + 'rpc/update_punteggio_squadre';
    const body = {
      p_id_utente: userId,
      p_id_squadre: nomeSquadra,
      p_punteggio_squadre: this.punteggioOttenuto,
    };

    return this.http.post<void>(url, body, {
      headers: environment.headerSupabase,
    });
  }
}
