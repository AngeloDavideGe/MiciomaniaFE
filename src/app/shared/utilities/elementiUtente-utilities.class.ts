import { inject } from '@angular/core';
import { ElementiUtenteService } from '../services/elementiUtente.service';
import { Observable, of, take, tap } from 'rxjs';
import { ElementiUtente } from '../interfaces/elementiUtente.interface';
import { LoadingService } from '../services/loading.service';

export class ElementiUtenteUtilities {
  public elementiUtenteService = inject(ElementiUtenteService);
  private loadingService = inject(LoadingService);

  public getElementiUtente(
    idUtente: string,
    loading: boolean
  ): Observable<ElementiUtente> {
    const storageElementiUtente = sessionStorage.getItem('elementiUtente');

    if (storageElementiUtente) {
      this.elementiUtenteService.elementiUtente = JSON.parse(
        storageElementiUtente
      );
      return of(this.elementiUtenteService.elementiUtente);
    } else {
      loading ? this.loadingService.show() : null;
      return this.getElemtiUtenteHttp(idUtente);
    }
  }

  private getElemtiUtenteHttp(idUtente: string): Observable<ElementiUtente> {
    return this.elementiUtenteService.getElementiUtente(idUtente).pipe(
      take(1),
      tap((elementiUtente) => this.nextGetElemUtenti(elementiUtente))
    );
  }

  private nextGetElemUtenti(elementiUtente: ElementiUtente): void {
    this.elementiUtenteService.elementiUtente = elementiUtente;
    sessionStorage.setItem('elementiUtente', JSON.stringify(elementiUtente));
    this.loadingService.hide();
  }
}
