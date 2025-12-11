import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CanzoniParodia,
  MangaParodia,
  Proposta,
  UtenteParodie,
} from '../../interfaces/elementiUtente.interface';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root',
})
export class ElementiUtenteService extends BaseService {
  public propostaCaricata: boolean = true;
  public canzoniParodia: CanzoniParodia | null = null;
  public mangaParodia: MangaParodia | null = null;

  constructor() {
    super('BE_CS');
  }

  getListaCanzoniMiciomani(): Observable<CanzoniParodia> {
    return this.getCustom<CanzoniParodia>(
      'Parodie/get_all_canzoni_parodia',
      {} as HttpParams
    );
  }

  getListaMangaMiciomani(): Observable<MangaParodia> {
    return this.getCustom<MangaParodia>(
      'Parodie/get_all_manga_parodia',
      {} as HttpParams
    );
  }

  getElementiUtente(idUtente: string): Observable<UtenteParodie> {
    return this.getCustom<UtenteParodie>(
      'Parodie/get_manga_e_canzone_utente/' + idUtente,
      {} as HttpParams
    );
  }

  postProposta(proposta: Proposta): Observable<Proposta> {
    const formData = new FormData();
    formData.append('Tipo', proposta.tipo);
    formData.append('Nome', proposta.nome);
    formData.append('Descrizione', proposta.genere);
    formData.append('File', proposta.url);
    formData.append('Copertina', '');

    return this.postCustom<Proposta>('proposte/invio_proposta', formData);
  }
}
