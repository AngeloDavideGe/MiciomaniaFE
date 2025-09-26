import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base/base.service';
import {
  Classifica,
  Squadre,
  TopUser,
} from '../../interfaces/squadre.interface';

@Injectable({
  providedIn: 'root',
})
export class SquadreService extends BaseService {
  public classifica: Classifica = {
    squadre: [] as Squadre[],
    topUser: [] as TopUser[],
  } as Classifica;

  constructor() {
    super('DB1');
  }

  getClassifica(): Observable<Classifica> {
    return this.postCustom<Classifica>('rpc/get_classifica', {});
  }

  updatePunteggioSquadra(
    userId: string,
    nomeSquadra: string[],
    punteggioOttenuto: number
  ): Observable<void> {
    const body = {
      p_id_utente: userId,
      p_id_squadre: nomeSquadra,
      p_punteggio_squadre: punteggioOttenuto,
    };

    return this.postCustom<void>('rpc/update_punteggio_squadre', body);
  }
}
