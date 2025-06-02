import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { Proposta } from '../../../../../shared/interfaces/elementiUtente.interface';

@Injectable({
  providedIn: 'root',
})
export class PropostaService {
  constructor(private http: HttpClient) {}

  public postProposta(proposta: Proposta): Observable<Proposta> {
    const url = environment.urlBE + 'proposte/invio_proposta';

    const formData = new FormData();
    formData.append('Tipo', proposta.tipo);
    formData.append('Nome', proposta.nome);
    formData.append('Descrizione', proposta.genere);
    formData.append('IdUtente', proposta.id_autore);
    formData.append('File', proposta.link);
    formData.append('Copertina', '');

    return this.http.post<Proposta>(url, formData, {
      headers: environment.headerRailway,
    });
  }
}
