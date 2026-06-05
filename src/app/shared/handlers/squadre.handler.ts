import { DataHttp } from '../../core/api/http.data';

export function setPunteggioOttenuto(punteggio: number) {
  if (punteggio == 0) {
    DataHttp.punteggioOttenuto = 0;
  } else {
    DataHttp.punteggioOttenuto += punteggio;
  }
}
