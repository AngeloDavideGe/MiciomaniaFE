import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CanzoniMiciomania,
  ElementiUtente,
  MangaMiciomania,
  Proposta,
} from '../../interfaces/elementiUtente.interface';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root',
})
export class ElementiUtenteService extends BaseService {
  public propostaCaricata: boolean = true;

  constructor() {
    super('DB2');
  }

  getListaCanzoniMiciomani(): Observable<CanzoniMiciomania[]> {
    return this.postCustom<CanzoniMiciomania[]>('rpc/get_all_canzoni', {});
  }

  getListaMangaMiciomani(): Observable<MangaMiciomania[]> {
    return this.postCustom<MangaMiciomania[]>('rpc/get_all_manga', {});
  }

  getElementiUtente(idUtente: string): Observable<ElementiUtente> {
    const body = {
      id_utente: idUtente,
    };

    return this.postCustom<ElementiUtente>('rpc/get_elementi_utente', body);
  }

  postProposta(proposta: Proposta): Observable<Proposta> {
    const formData = new FormData();
    formData.append('Tipo', proposta.tipo);
    formData.append('Nome', proposta.nome);
    formData.append('Descrizione', proposta.genere);
    formData.append('IdUtente', proposta.id_autore);
    formData.append('File', proposta.link);
    formData.append('Copertina', '');

    return this.postCustom<Proposta>('proposte/invio_proposta', formData);
  }
}
