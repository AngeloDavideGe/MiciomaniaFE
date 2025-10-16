import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base/base.service';
import {
  Classifica,
  Squadre,
  TopUser,
} from '../../interfaces/squadre.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SquadreService extends BaseService {
  public classifica: Classifica = {
    squadre: [] as Squadre[],
    topUser: [] as TopUser[],
  } as Classifica;

  constructor() {
    super('BE');
  }

  getClassifica(): Observable<Classifica> {
    const params = new HttpParams();

    return this.getCustom<Classifica>(
      'Squadre/get_squadre_e_giocatori',
      params
    );
  }

  updatePunteggioSquadra(
    userId: string,
    nomeSquadra: string,
    punteggioOttenuto: number
  ): Observable<void> {
    const body = {
      utente: userId,
      squadra: nomeSquadra,
      punteggio: punteggioOttenuto,
    };

    return this.postCustom<void>(
      'Squadre/update_punteggio_squadre_e_giocatore',
      body
    );
  }
}
