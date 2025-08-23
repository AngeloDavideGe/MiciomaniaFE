import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../shared/services/base/base.service';
import { ListaEUtenti, MangaENome } from '../interfaces/manga.interface';

@Injectable({
  providedIn: 'root',
})
export class MangaService extends BaseService {
  constructor() {
    super('DB1');
  }

  getListaManga(idUtente: string | null): Observable<ListaEUtenti> {
    const body = { input_id: idUtente };

    return this.postCustom<typeof body, ListaEUtenti>(
      'rpc/get_all_manga',
      body
    );
  }

  getNomeEVolumiMangaByPath(path: string): Observable<MangaENome> {
    const body = { input_table_name: path };

    return this.postCustom<typeof body, MangaENome>(
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

    return this.postCustom<typeof body, void>('rpc/upsert_manga_utente', body);
  }
}
