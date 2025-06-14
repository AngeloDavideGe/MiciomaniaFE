import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MangaMiciomania } from '../../../shared/interfaces/elementiUtente.interface';

@Injectable({
  providedIn: 'root',
})
export class MangaMiciomaniService {
  public mangaMiciomani: MangaMiciomania[] = [];
  public mangaMiciomaniLoaded = false;

  constructor(private http: HttpClient) {
    this.loadMangaStorage();
  }

  getListaMangaMiciomani(): Observable<MangaMiciomania[]> {
    const url = environment.urlBE + 'manga_miciomania/lista_manga';

    return this.http.get<MangaMiciomania[]>(url, {
      headers: environment.headerRailway,
    });
  }

  private loadMangaStorage(): void {
    const mangaStorage = localStorage.getItem('mangaMiciomani');
    if (mangaStorage) {
      this.mangaMiciomani = JSON.parse(mangaStorage);
    }

    const mangaLoaded = sessionStorage.getItem('mangaMiciomaniLoaded');
    if (mangaLoaded) {
      this.mangaMiciomaniLoaded = JSON.parse(mangaLoaded);
    }
  }
}
