import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { finalize, Observable, take } from 'rxjs';
import { Ruolo } from '../../../shared/enums/users.enum';
import { User } from '../../../shared/interfaces/users.interface';
import { BaseService } from '../../../shared/services/base/base.service';
import { LoadingService } from '../../../shared/services/template/loading.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends BaseService {
  private loadingService = inject(LoadingService);

  constructor() {
    super('DB1');
  }

  private updateRuoloUtente(id: string, ruolo: Ruolo): Observable<User> {
    const body = { ruolo }; // {ruolo: ruolo} - key: value sono uguali
    const params = new HttpParams().set('id', `eq.${id}`);

    return this.patchCustom<typeof body, User>(`utenti`, body, params);
  }

  updateRuoloUtenteCustom(
    userId: string,
    ruolo: Ruolo,
    nextCall: Function
  ): void {
    this.loadingService.show();

    this.updateRuoloUtente(userId, ruolo)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe({
        next: () => nextCall(),
        error: (error) =>
          console.error("Errore durante l'aggiornamento del ruolo:", error),
      });
  }
}
