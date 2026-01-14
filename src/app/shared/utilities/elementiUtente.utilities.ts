import { inject } from '@angular/core';
import { ElementiUtenteService } from '../services/api/elementiUtente.service';
import { finalize, Observable, of, take, tap } from 'rxjs';
import { LoadingService } from '../services/template/loading.service';
import { DataHttp } from '../../core/api/http.data';
import { UtenteParodie } from '../interfaces/elementiUtente.interface';

export class ElementiUtenteUtilities {
  public elementiUtenteService = inject(ElementiUtenteService);
  private loadingService = inject(LoadingService);

  public getElementiUtente(idUtente: string): Observable<UtenteParodie> {
    const elementiUtente: UtenteParodie | null = DataHttp.elementiUtente;

    if (elementiUtente) {
      // return of(elementiUtente);
      this.loadingService.show();
      return this.getElemtiUtenteHttp(idUtente);
    } else {
      this.loadingService.show();
      return this.getElemtiUtenteHttp(idUtente);
    }
  }

  private getElemtiUtenteHttp(idUtente: string): Observable<UtenteParodie> {
    return this.elementiUtenteService.getElementiUtente(idUtente).pipe(
      take(1),
      finalize(() => this.loadingService.hide()),
      tap((elementiUtente) => (DataHttp.elementiUtente = elementiUtente))
    );
  }
}
