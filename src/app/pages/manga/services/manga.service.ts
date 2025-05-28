import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  ListaManga,
  MangaUtente,
  MangaVolume,
} from '../interfaces/manga.interface';

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  public listaManga: ListaManga[] = [];
  public mangaScaricati: boolean = false;
  public initialMangaUtente: MangaUtente = {} as MangaUtente;
  public mangaAperti: { nome: string; volumi: MangaVolume[] }[] = [];
  public mangaSelected: { nome: string; completato: boolean } | null = null;

  constructor(private http: HttpClient) {
    this.loadMangaFromStorage();
  }

  getListaManga(
    idUtente: string | null
  ): Observable<{ lista_manga: ListaManga[]; manga_utente: MangaUtente[] }> {
    const url = environment.urlDB + 'rpc/get_all_manga';
    const body = { input_id: idUtente };
    return this.http.post<{
      lista_manga: ListaManga[];
      manga_utente: MangaUtente[];
    }>(url, body, { headers: environment.headerSupabase });
  }

  getNomeEVolumiMangaByPath(path: string): Observable<any> {
    const url = environment.urlDB + 'rpc/get_volumi_e_nome_by_path_wrapper';
    const body = { input_table_name: path };
    return this.http.post<any>(url, body, {
      headers: environment.headerSupabase,
    });
  }

  getVolumiManga(titolo: string): Observable<{ volumi: MangaVolume[] }> {
    const url = environment.urlDB + 'rpc/get_volumi_by_path_wrapper';
    const body = { input_table_name: titolo };
    return this.http.post<{ volumi: MangaVolume[] }>(url, body, {
      headers: environment.headerSupabase,
    });
  }

  postOrUpdateMangaUtente(
    id: string,
    preferiti: string,
    letti: string,
    completati: string
  ): Observable<void> {
    const url = environment.urlDB + 'rpc/upsert_manga_utente';
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

  resettaMangaUtente(): void {
    this.listaManga = [] as ListaManga[];
  }

  private loadMangaFromStorage(): void {
    const listaManga = localStorage.getItem('listaManga');
    if (listaManga) {
      this.listaManga = JSON.parse(listaManga);
    }

    const mangaUtente = localStorage.getItem('mangaUtente');
    if (mangaUtente) {
      this.initialMangaUtente = JSON.parse(mangaUtente);
    }

    const mangaCaricati = sessionStorage.getItem('mangaCaricati');
    if (mangaCaricati) {
      this.mangaScaricati = JSON.parse(mangaCaricati);
    }
  }
}
