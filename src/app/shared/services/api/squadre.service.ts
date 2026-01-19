import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base/base.service';
import {
  Classifica,
  Squadre,
  Giocatori,
} from '../../interfaces/squadre.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SquadreService extends BaseService {
  public squadraInGame: Squadre[] = [];

  public classifica: Classifica = {
    squadre: [] as Squadre[],
    giocatori: [] as Giocatori[],
  };

  constructor() {
    super('CS');
  }

  getSquadre(): Observable<Squadre[]> {
    const params = new HttpParams();

    return this.getCustom<Squadre[]>('Squadre/get_squadre', params);
  }

  getClassifica(): Observable<Classifica> {
    const params = new HttpParams();

    return this.getCustom<Classifica>(
      'Squadre/get_squadre_e_giocatori',
      params,
    );
  }

  updatePunteggioSquadra(
    userId: string,
    nomeSquadra: string,
    punteggioOttenuto: number,
  ): Observable<void> {
    const body = {
      nomeSquadra: nomeSquadra,
      punteggio: punteggioOttenuto,
    };

    return this.putCustom<void>(
      `Squadre/update_punteggio_giocatore/${userId}`,
      body,
    );
  }
}
