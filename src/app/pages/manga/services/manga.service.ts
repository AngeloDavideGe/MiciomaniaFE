import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  ListaEUtenti,
  ListaManga,
  MangaENome,
  MangaUtente,
  MangaVolume,
} from '../interfaces/manga.interface';

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  constructor(private http: HttpClient) {}

  getListaManga(idUtente: string | null): Observable<ListaEUtenti> {
    const url = environment.urlDB1 + 'rpc/get_all_manga';
    const body = { input_id: idUtente };
    return this.http.post<{
      lista_manga: ListaManga[];
      manga_utente: MangaUtente[];
    }>(url, body, { headers: environment.headerSupabase });
  }

  getNomeEVolumiMangaByPath(path: string): Observable<MangaENome> {
    const url = environment.urlDB1 + 'rpc/get_volumi_e_nome_by_path_wrapper';
    const body = { input_table_name: path };
    return this.http.post<MangaENome>(url, body, {
      headers: environment.headerSupabase,
    });
  }

  postOrUpdateMangaUtente(
    id: string,
    preferiti: string,
    letti: string,
    completati: string
  ): Observable<void> {
    const url = environment.urlDB1 + 'rpc/upsert_manga_utente';
    const body = {
      p_id_utente: id,
      p_manga_preferiti: preferiti,
      p_manga_letti: letti,
      p_manga_completati: completati,
    };
    return this.http.post<void>(url, body, {
      headers: environment.headerSupabase,
    });
  }
}
