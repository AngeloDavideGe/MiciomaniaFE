import { inject } from '@angular/core';
import { ElementiUtenteService } from '../services/elementiUtente.service';
import { take } from 'rxjs';

export class ElementiUtenteUtilities {
  private elementiUtenteService = inject(ElementiUtenteService);

  public getElementiUtente(idUtente: string): void {
    this.elementiUtenteService
      .getElementiUtente(idUtente)
      .pipe(take(1))
      .subscribe({
        next: (elementiUtente) => {
          this.elementiUtenteService.elementiUtente = elementiUtente;
        },
        error: (error) => {
          console.error('Errore nel recupero degli elementi utente:', error);
        },
      });
  }
}
