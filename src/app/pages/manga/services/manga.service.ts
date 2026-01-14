import { HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { MangaUtente } from '../../../shared/interfaces/http.interface';
import { BaseService } from '../../../shared/services/base/base.service';
import { ListaEUtenti, ListaManga } from '../interfaces/manga.interface';

@Injectable({
  providedIn: 'root',
})
export class MangaService extends BaseService {
  public listaManga = signal<ListaManga[]>([]);

  constructor() {
    super('BE_CS');
  }

  getAllManga(): Observable<ListaManga[]> {
    const params = new HttpParams();

    return this.getCustom<ListaManga[]>('Manga/get_all_manga', params);
  }

  getMangaPreferiti(idUtente: string): Observable<MangaUtente> {
    const params = new HttpParams().set('idUtente', idUtente);

    return this.getCustom<MangaUtente>('Manga/get_manga_preferiti', params);
  }

  getAllMangaEPreferiti(idUtente: string): Observable<ListaEUtenti> {
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
    const body = {
      preferiti: mangaUtente.preferiti,
      letti: mangaUtente.letti,
      completati: mangaUtente.completati,
    };

    return this.putCustom<void>(`Manga/upsert_manga_preferiti/${id}`, body);
  }
}
