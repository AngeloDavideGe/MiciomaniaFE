import { handlerFunc } from '../../../library/functions/handler.function';
import { DataHttp } from '../../core/api/http.data';
import { Squadre } from '../interfaces/squadre.interface';
import { SquadreService } from '../services/api/squadre.service';

export function getSquadreInGame(params: {
  squadreService: SquadreService;
  nextCall: Function;
}): void {
  if (params.squadreService.squadraInGame.length == 0) {
    handlerFunc<Squadre[]>({
      callHttp: () => params.squadreService.getSquadre(),
      nextCall: (data: Squadre[]) => {
        params.squadreService.squadraInGame = data;
        params.nextCall(data);
      },
    });
  } else {
    params.nextCall(params.squadreService.squadraInGame);
  }
}

export function setPunteggioOttenuto(punteggio: number) {
  if (punteggio == 0) {
    DataHttp.punteggioOttenuto = 0;
  } else {
    DataHttp.punteggioOttenuto += punteggio;
  }
}
