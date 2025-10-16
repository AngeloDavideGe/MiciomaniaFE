import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../shared/services/base/base.service';
import { ListaEUtenti } from '../interfaces/manga.interface';
import { HttpParams } from '@angular/common/http';
import { MangaUtente } from '../../../shared/interfaces/http.interface';

@Injectable({
  providedIn: 'root',
})
export class MangaService extends BaseService {
  constructor() {
    super('BE');
  }

  getListaManga(idUtente: string): Observable<ListaEUtenti> {
    const params = new HttpParams().set('idUtente', idUtente);

    return this.getCustom<ListaEUtenti>(
      'Manga/get_all_manga_e_preferiti',
      params
    );
  }

  postOrUpdateMangaUtente(
    id: string,
    mangaUtente: MangaUtente
  ): Observable<void> {
    return this.postCustom<void>(
      `Manga/upsert_manga_preferiti/${id}`,
      mangaUtente
    );
  }
}
