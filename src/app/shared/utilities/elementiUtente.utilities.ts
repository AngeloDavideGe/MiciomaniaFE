import { inject } from '@angular/core';
import { finalize, Observable, of, take, tap } from 'rxjs';
import { UtenteParodie } from '../interfaces/elementiUtente.interface';
import { ElementiUtenteService } from '../services/api/elementiUtente.service';
import { LoadingService } from '../services/template/loading.service';

export class ElementiUtenteUtilities {
  public elementiUtenteService = inject(ElementiUtenteService);
  private loadingService = inject(LoadingService);

  public getElementiUtente(idUtente: string): Observable<UtenteParodie> {
    const elementiUtente: UtenteParodie | null =
      this.elementiUtenteService.utenteParodie;

    if (elementiUtente) {
      return of(elementiUtente);
    } else {
      this.loadingService.show();
      return this.elementiUtenteService.getElementiUtente(idUtente).pipe(
        take(1),
        finalize(() => this.loadingService.hide()),
        tap(
          (elementiUtente) =>
            (this.elementiUtenteService.utenteParodie = elementiUtente),
        ),
      );
    }
  }
}
