import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Squadre } from '../../../pages/home/interfaces/profilo.interface';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root',
})
export class SquadreService extends BaseService {
  public squadre: Squadre[] = [];

  constructor() {
    super('DB1');
  }

  getSquadre(): Observable<Squadre[]> {
    return this.getCustom<Squadre>('squadre');
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
