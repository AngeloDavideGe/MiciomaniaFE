import { inject } from '@angular/core';
import { ElementiUtenteService } from '../services/api/elementiUtente.service';
import { Observable, of, take, tap } from 'rxjs';
import { ElementiUtente } from '../interfaces/elementiUtente.interface';
import { LoadingService } from '../services/template/loading.service';
import { DataHttp } from '../../core/api/http.data';

export class ElementiUtenteUtilities {
  public elementiUtenteService = inject(ElementiUtenteService);
  private loadingService = inject(LoadingService);

  public getElementiUtente(
    idUtente: string,
    loading: boolean
  ): Observable<ElementiUtente> {
    const elementiUtente: ElementiUtente | null = DataHttp.elementiUtente;

    if (elementiUtente) {
      return of(elementiUtente);
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
    DataHttp.elementiUtente = elementiUtente;
    this.loadingService.hide();
  }
}
