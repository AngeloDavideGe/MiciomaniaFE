import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  CanzoniMiciomania,
  ElementiUtente,
  MangaMiciomania,
} from '../../interfaces/elementiUtente.interface';

@Injectable({
  providedIn: 'root',
})
export class ElementiUtenteService {
  public propostaCaricata: boolean = true;

  constructor(private http: HttpClient) {
    this.getElementiFromStorage();
  }

  getListaCanzoniMiciomani(): Observable<CanzoniMiciomania[]> {
    const url = environment.urlDB2 + 'rpc/get_all_canzoni';

    return this.http.get<CanzoniMiciomania[]>(url, {
      headers: environment.headerSupabase2,
    });
  }

  getListaMangaMiciomani(): Observable<MangaMiciomania[]> {
    const url = environment.urlDB2 + 'rpc/get_all_manga';
    const body = {};
    return this.http.post<MangaMiciomania[]>(url, body, {
      headers: environment.headerSupabase2,
    });
  }

  getElementiUtente(idUtente: string): Observable<ElementiUtente> {
    const apiUrl = `${environment.urlDB2}rpc/get_elementi_utente`;
    const body = {
      id_utente: idUtente,
    };

    return this.http.post<ElementiUtente>(apiUrl, body, {
      headers: environment.headerSupabase2,
    });
  }

  private getElementiFromStorage(): void {}
}
