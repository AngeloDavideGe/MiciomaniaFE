import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../library/services/base.service';
import {
  Classifica,
  Giocatori,
  Squadre,
} from '../../interfaces/squadre.interface';

@Injectable({
  providedIn: 'root',
})
export class SquadreService extends BaseService {
  public squadraInGame: Squadre[] = [];

  public classifica = signal<Classifica>({
    squadre: [] as Squadre[],
    giocatori: [] as Giocatori[],
  });

  constructor() {
    super('CS');
  }

  getSquadre(): Observable<Squadre[]> {
    return this.getCustom<Squadre[]>('Squadre/get_squadre');
  }

  getClassifica(): Observable<Classifica> {
    return this.getCustom<Classifica>('Squadre/get_squadre_e_giocatori');
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
      { body: body },
    );
  }
}
