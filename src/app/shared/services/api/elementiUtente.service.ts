import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../library/services/base.service';
import {
  CanzoniParodia,
  MangaParodia,
  Proposta,
  UtenteParodie,
} from '../../interfaces/elementiUtente.interface';

@Injectable({
  providedIn: 'root',
})
export class ElementiUtenteService extends BaseService {
  public canzoniLoaded: boolean = false;
  public mangaLoaded: boolean = false;
  public utenteParodieLoaded: boolean = false;

  public canzoniParodia = signal<CanzoniParodia | null>(null);
  public mangaParodia = signal<MangaParodia | null>(null);
  public utenteParodie = signal<UtenteParodie | null>(null);
  public propostaCaricata = signal<boolean>(true);

  constructor() {
    super('CS');
  }

  getListaCanzoniMiciomani(): Observable<CanzoniParodia> {
    return this.getCustom<CanzoniParodia>('Parodie/get_all_canzoni_parodia');
  }

  getListaMangaMiciomani(): Observable<MangaParodia> {
    return this.getCustom<MangaParodia>('Parodie/get_all_manga_parodia');
  }

  getElementiUtente(idUtente: string): Observable<UtenteParodie> {
    return this.getCustom<UtenteParodie>(
      'Parodie/get_manga_e_canzone_utente/' + idUtente,
    );
  }

  postProposta(proposta: Proposta): Observable<Proposta> {
    const body = {
      nome: proposta.nome,
      genere: proposta.genere,
      copertina: proposta.copertina,
      url: proposta.url,
      tipo: proposta.tipo,
    };

    return this.putCustom<Proposta>(
      `Parodie/upsert_manga_o_canzone/${proposta.idUtente}`,
      { body: body },
    );
  }
}
