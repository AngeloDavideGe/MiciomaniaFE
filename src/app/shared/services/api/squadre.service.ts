import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Squadre } from '../../../pages/home/interfaces/profilo.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SquadreService {
  constructor(private http: HttpClient) {}

  getSquadre(): Observable<Squadre[]> {
    const url = environment.urlDB1 + 'squadre';
    return this.http.get<Squadre[]>(url, {
      headers: environment.headerSupabase,
    });
  }

  updatePunteggioSquadra(
    userId: string,
    nomeSquadra: string[],
    punteggioOttenuto: number
  ): Observable<void> {
    const url = environment.urlDB1 + 'rpc/update_punteggio_squadre';
    const body = {
      p_id_utente: userId,
      p_id_squadre: nomeSquadra,
      p_punteggio_squadre: punteggioOttenuto,
    };

    return this.http.post<void>(url, body, {
      headers: environment.headerSupabase,
    });
  }
}
