import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ElementiUtente,
  MangaMiciomania,
  Proposta,
} from '../interfaces/elementiUtente.interface';

@Injectable({
  providedIn: 'root',
})
export class ElementiUtenteService {
  public elementiUtente: ElementiUtente = {
    manga: {} as MangaMiciomania,
    proposta: {} as Proposta,
  } as ElementiUtente;

  constructor(private http: HttpClient) {}

  getElementiUtente(idUtente: string): Observable<ElementiUtente> {
    const apiUrl = `${environment.urlBE}user_miciomania/lista_elementi_utente?IdUtente=${idUtente}`;

    return this.http.get<ElementiUtente>(apiUrl, {
      headers: environment.headerRailway,
    });
  }
}
