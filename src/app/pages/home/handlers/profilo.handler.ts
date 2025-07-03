import { inject, Injectable } from '@angular/core';
import { ProfiloService } from '../services/profilo.service';
import { finalize, map, switchMap, take, tap } from 'rxjs';
import { Profilo, Tweet } from '../interfaces/profilo.interface';
import { ProfiloUtilities } from '../utilities/profilo-utilities.class';
import { User } from '../../../shared/interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfiloHandler {
  private profiloService = inject(ProfiloService);
  private profiloUtilities = new ProfiloUtilities();

  public profiloPersonale: Profilo | null = null;
  public aggiornamentoPic: boolean = false;

  constructor() {
    const pubblicazioniJSON = sessionStorage.getItem('pubblicazioni');
    if (pubblicazioniJSON) {
      this.profiloPersonale = JSON.parse(pubblicazioniJSON);
    }
  }

  public getProfiloById(params: {
    userId: string;
    setLocalStorage: (profilo: Profilo) => void;
    caricamentoCompletato: () => void;
    caricamentoFallito: () => void;
  }): void {
    this.profiloService
      .getProfiloById(params.userId)
      .pipe(
        take(1),
        map((data) => this.profiloUtilities.mapToProfilo(data) as Profilo)
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

  public deletePubblicazioneById(params: {
    tweetId: number;
    finalizeCall: () => void;
    nextCall: () => void;
  }): void {
    this.profiloService
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

  public postPubblicazioni(params: { tweet: Tweet; nextCall: Function }): void {
    this.profiloService
      .postPubblicazioni(params.tweet)
      .pipe(take(1))
      .subscribe({
        next: () => params.nextCall(),
        error: (err) =>
          console.error('errore nella pubblicazione del tweer', err),
      });
  }

  public uploadProfileImage(params: {
    selectedFile: File | null;
    user: User;
    tapCall: Function;
    switcMapCall: Function;
    nextCall: Function;
    errorCall: Function;
  }): void {
    this.profiloService
      .uploadProfileImage(params.selectedFile!, params.user.id)
      .pipe(
        take(1),
        tap((url: string) => params.tapCall(url)),
        switchMap(() => params.switcMapCall(params.user))
      )
      .subscribe({
        next: (data) => params.nextCall(data),
        error: (err) => params.errorCall(err),
      });
  }
}
