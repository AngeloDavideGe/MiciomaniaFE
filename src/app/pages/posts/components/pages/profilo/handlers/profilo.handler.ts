import { finalize, map, take } from 'rxjs';
import { Profilo } from '../../../../../../shared/interfaces/http.interface';
import { mapToProfilo } from '../../../../../home/functions/profilo.function';
import { Tweet } from '../../../shared/post.interface';
import { ProfiloService } from '../services/profilo.service';

export function getProfiloById(params: {
  profiloService: ProfiloService;
  userId: string;
  setLocalStorage: (profilo: Profilo) => void;
  caricamentoCompletato: () => void;
  caricamentoFallito: () => void;
}): void {
  params.profiloService
    .getProfiloById(params.userId)
    .pipe(
      take(1),
      map((data: Profilo) => mapToProfilo(data) as Profilo)
    )
    .subscribe({
      next: (data) => {
        params.setLocalStorage(data);
        params.caricamentoCompletato();
      },
      error: (error) => {
        params.caricamentoFallito();
        console.error('Errore nel recupero del profilo', error);
      },
    });
}

export function deletePubblicazioneById(params: {
  profiloService: ProfiloService;
  tweetId: number;
  finalizeCall: () => void;
  nextCall: () => void;
}): void {
  params.profiloService
    .deletePubblicazioni(params.tweetId)
    .pipe(
      take(1),
      finalize(() => params.finalizeCall())
    )
    .subscribe({
      next: () => params.nextCall(),
      error: (error) =>
        console.error('Errore nella cancellazione del tweet', error),
    });
}

export function postPubblicazioni(params: {
  profiloService: ProfiloService;
  tweet: Tweet;
  nextCall: Function;
}): void {
  params.profiloService
    .postPubblicazioni(params.tweet)
    .pipe(take(1))
    .subscribe({
      next: () => params.nextCall(),
      error: (err) => console.error('errore pubblicazione tweer', err),
    });
}
