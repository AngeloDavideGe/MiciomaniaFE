import { take } from 'rxjs';
import { InterazioniService } from '../services/interazioni.service';
import {
  Interazione,
  InterazioniPaginate,
} from '../interfaces/interazioni.interface';

export function getAllPoke(interazioniService: InterazioniService): void {
  if (interazioniService.allInterazioni().length > 0) return;

  interazioniService
    .getAllInterazioni()
    .pipe(take(1))
    .subscribe({
      next: (interazioni: Interazione[]) =>
        interazioniService.allInterazioni.set(interazioni),
      error: (err) => console.error(err),
    });
}

export function getPokePersonali(
  interazioniService: InterazioniService,
  idUtente: string,
): void {
  if (interazioniService.interazioniPersonali().length > 0) return;

  interazioniService
    .getInterazioniPersonali(idUtente)
    .pipe(take(1))
    .subscribe({
      next: (interazioni: Interazione[]) =>
        interazioniService.interazioniPersonali.set(interazioni),
      error: (err) => console.error(err),
    });
}

export function getPokePaginate(params: {
  interazioniService: InterazioniService;
  el: number;
  num: number;
  ord: 'cresc' | 'desc';
  key: string;
  nextCallback: (interazioni: InterazioniPaginate) => void;
}): void {
  params.interazioniService
    .getInterazioniPaginate(params.el, params.num, params.ord, params.key)
    .pipe(take(1))
    .subscribe({
      next: (interazioniPaginate: InterazioniPaginate) =>
        params.nextCallback(interazioniPaginate),
      error: (err) => console.error(err),
    });
}
