import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, take } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/interfaces/users.interface';
import { Ruolo } from '../../../shared/enums/users.enum';
import { LoadingService } from '../../../shared/services/template/loading.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  private updateRuoloUtente(id: string, ruolo: Ruolo): Observable<User> {
    const url = `${environment.urlDB1}utenti?id=eq.${id}`;
    const body = { ruolo }; // {ruolo: ruolo} - key: value sono uguali
    return this.http.patch<User>(url, body, {
      headers: environment.headerSupabase,
    });
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
