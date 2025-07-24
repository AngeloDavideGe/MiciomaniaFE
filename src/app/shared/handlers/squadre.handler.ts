import { inject, Injectable } from '@angular/core';
import { take } from 'rxjs';
import { SquadreService } from '../services/api/squadre.service';
import { Squadre } from '../../pages/home/interfaces/profilo.interface';

@Injectable({
  providedIn: 'root',
})
export class SquadreHandler {
  private squadreService = inject(SquadreService);

  public squadre: Squadre[] = [];
  public punteggioOttenuto: number = 0;

  constructor() {
    this.loadPunteggioOttenutoFromStorage();
  }

  set setPunteggioOttenuto(punteggio: number) {
    if (punteggio == 0) {
      this.punteggioOttenuto = 0;
    } else {
      this.punteggioOttenuto += punteggio;
    }
  }

  public loadSquadre(params: {
    ifCall: Function;
    elseCall: Function;
    nextCall: Function;
  }): void {
    if (this.squadre.length == 0) {
      params.ifCall();
      this.squadreService
        .getSquadre()
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.squadre = data;
            params.nextCall();
          },
          error: (err) => console.error('errore nel recupero squadre', err),
        });
    } else {
      params.elseCall();
    }
  }

  public updatePunteggioSquadra(
    userId: string,
    nomeSquadra: string[],
    nextUpdatePunteggio: Function
  ): void {
    this.squadreService
      .updatePunteggioSquadra(userId, nomeSquadra, this.punteggioOttenuto)
      .pipe(take(1))
      .subscribe({
        next: () => nextUpdatePunteggio(),
        error: (err) =>
          console.error("errore nell'aggiornamento del punteggio", err),
      });
  }

  private loadPunteggioOttenutoFromStorage(): void {
    const punteggioOttenuto = sessionStorage.getItem('punteggioOttenuto');
    if (punteggioOttenuto) {
      this.punteggioOttenuto = JSON.parse(punteggioOttenuto);
    }
  }
}
