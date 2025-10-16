import { finalize, take } from 'rxjs';
import { DataHttp } from '../../core/api/http.data';
import { Classifica } from '../interfaces/squadre.interface';
import { SquadreService } from '../services/api/squadre.service';

export function updatePunteggioSquadra(params: {
  squadreService: SquadreService;
  userId: string;
  nomeSquadra: string;
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
  errorCall: Function;
  finalizeFunc: Function;
}): void {
  if (params.squadreService.classifica.squadre.length == 0) {
    params.ifCall();
    params.squadreService
      .getClassifica()
      .pipe(
        take(1),
        finalize(() => params.finalizeFunc())
      )
      .subscribe({
        next: (data: Classifica) => {
          params.squadreService.classifica = data;
          params.nextCall();
        },
        error: (err) => {
          console.error('errore nel recupero squadre', err);
          params.errorCall();
        },
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
