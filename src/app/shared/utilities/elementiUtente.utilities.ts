import { inject } from '@angular/core';
import { Observable, of, take, tap } from 'rxjs';
import { UtenteParodie } from '../interfaces/elementiUtente.interface';
import { ElementiUtenteService } from '../services/api/elementiUtente.service';

export class ElementiUtenteUtilities {
  public elementiUtenteService = inject(ElementiUtenteService);

  public getElementiUtente(idUtente: string): Observable<UtenteParodie> {
    const elementiUtente: UtenteParodie | null =
      this.elementiUtenteService.utenteParodie();

    return this.elementiUtenteService.getElementiUtente(idUtente).pipe(
      take(1),
      tap((elementiUtente) =>
        this.elementiUtenteService.utenteParodie.set(elementiUtente),
      ),
    );
  }
}
