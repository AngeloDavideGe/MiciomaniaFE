import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CanzoniMiciomania,
  ElementiUtente,
  MangaMiciomania,
  Proposta,
} from '../../interfaces/elementiUtente.interface';
import { BaseService } from '../base/base.service';
import { DataHttp } from '../../../core/api/http.data';

@Injectable({
  providedIn: 'root',
})
export class ElementiUtenteService extends BaseService {
  public propostaCaricata: boolean = true;

  constructor() {
    super('DB2');

    const canzoniStorage = localStorage.getItem('canzoniMiciomani');
    if (canzoniStorage) {
      DataHttp.canzoniMiciomani = JSON.parse(canzoniStorage);
    }

    const canzoniLoaded = sessionStorage.getItem('canzoniMiciomaniLoaded');
    if (canzoniLoaded) {
      DataHttp.canzoniMiciomaniLoaded = JSON.parse(canzoniLoaded);
    }

    const mangaStorage = localStorage.getItem('mangaMiciomani');
    if (mangaStorage) {
      DataHttp.mangaMiciomani = JSON.parse(mangaStorage);
    }

    const mangaLoaded = sessionStorage.getItem('mangaMiciomaniLoaded');
    if (mangaLoaded) {
      DataHttp.mangaMiciomaniLoaded = JSON.parse(mangaLoaded);
    }

    const storageElementiUtente = sessionStorage.getItem('elementiUtente');
    if (storageElementiUtente) {
      DataHttp.elementiUtente = JSON.parse(storageElementiUtente);
    }
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
