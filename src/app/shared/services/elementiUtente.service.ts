import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CanzoniMiciomania,
  ElementiUtente,
  MangaMiciomania,
  Proposta,
} from '../interfaces/elementiUtente.interface';

@Injectable({
  providedIn: 'root',
})
export class ElementiUtenteService {
  public propostaCaricata: boolean = true;
  public elementiUtente: ElementiUtente = {
    manga: {} as MangaMiciomania,
    canzone: {} as CanzoniMiciomania,
    proposta: {} as Proposta,
  } as ElementiUtente;

  constructor(private http: HttpClient) {
    const storageElementiUtente = sessionStorage.getItem('elementiUtente');

    if (storageElementiUtente) {
      this.elementiUtente = JSON.parse(storageElementiUtente);
    }
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
}
