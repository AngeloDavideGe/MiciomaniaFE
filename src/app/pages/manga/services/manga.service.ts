import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../shared/services/base/base.service';
import { ListaEUtenti, MangaENome } from '../interfaces/manga.interface';
import { DataHttp } from '../../../core/api/http.data';

@Injectable({
  providedIn: 'root',
})
export class MangaService extends BaseService {
  constructor() {
    super('DB1');

    const listaManga = localStorage.getItem('listaManga');
    if (listaManga) {
      DataHttp.listaManga.set(JSON.parse(listaManga));
    }

    const mangaUtente = localStorage.getItem('mangaUtente');
    if (mangaUtente) {
      DataHttp.mangaUtente = JSON.parse(mangaUtente);
      DataHttp.initialMangaUtente = JSON.parse(mangaUtente);
    }

    const mangaCaricati = sessionStorage.getItem('mangaCaricati');
    if (mangaCaricati) {
      DataHttp.mangaScaricati = JSON.parse(mangaCaricati);
    }

    const mangaAperti = sessionStorage.getItem('mangaAperti');
    if (mangaAperti) {
      DataHttp.mangaAperti = JSON.parse(mangaAperti);
    }
  }

  getListaManga(idUtente: string | null): Observable<ListaEUtenti> {
    const body = { input_id: idUtente };

    return this.postCustom<ListaEUtenti>('rpc/get_all_manga', body);
  }

  getNomeEVolumiMangaByPath(path: string): Observable<MangaENome> {
    const body = { input_table_name: path };

    return this.postCustom<MangaENome>(
      'rpc/get_volumi_e_nome_by_path_wrapper',
      body
    );
  }

  postOrUpdateMangaUtente(
    id: string,
    preferiti: string,
    letti: string,
    completati: string
  ): Observable<void> {
    const body = {
      p_id_utente: id,
      p_manga_preferiti: preferiti,
      p_manga_letti: letti,
      p_manga_completati: completati,
    };

    return this.postCustom<void>('rpc/upsert_manga_utente', body);
  }
}
