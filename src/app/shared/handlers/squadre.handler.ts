import { take } from 'rxjs';
import { DataHttp } from '../../core/api/http.data';
import { SquadreService } from '../services/api/squadre.service';
import { Squadre } from '../../pages/home/interfaces/profilo.interface';

export function updatePunteggioSquadra(params: {
  squadreService: SquadreService;
  userId: string;
  nomeSquadra: string[];
  nextUpdatePunteggio: Function;
}): void {
  params.squadreService
    .updatePunteggioSquadra(
      params.userId,
      params.nomeSquadra,
      DataHttp.punteggioOttenuto
    )
    .pipe(take(1))
    .subscribe({
      next: () => params.nextUpdatePunteggio(),
      error: (err) => console.error('errore nel update punteggio', err),
    });
}

export function loadSquadre(params: {
  squadreService: SquadreService;
  ifCall: Function;
  elseCall: Function;
  nextCall: Function;
}): void {
  if (params.squadreService.squadre.length == 0) {
    params.ifCall();
    params.squadreService
      .getSquadre()
      .pipe(take(1))
      .subscribe({
        next: (data: Squadre[]) => {
          params.squadreService.squadre = data;
          params.nextCall();
        },
        error: (err) => console.error('errore nel recupero squadre', err),
      });
  } else {
    params.elseCall();
  }
}

export function setPunteggioOttenuto(punteggio: number) {
  if (punteggio == 0) {
    DataHttp.punteggioOttenuto = 0;
  } else {
    DataHttp.punteggioOttenuto += punteggio;
  }
}
