import { Injectable, signal } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { BaseService } from '../../../library/services/base.service';
import {
  Canzoni,
  CanzoniGet,
  iManga,
  MangaGet,
  MangaUtente,
} from '../interfaces/opere.interface';

@Injectable({
  providedIn: 'root',
})
export class OpereService extends BaseService {
  public manga = signal<iManga | null>(null);
  public canzoni = signal<Canzoni[]>([]);
  public mangaUtente = signal<MangaUtente | null>(null);

  public mangaLoaded: boolean = false;
  public canzoniLoaded: boolean = false;

  constructor() {
    super('CS');
  }

  getManga(idUtente: string): Observable<MangaGet> {
    return forkJoin({
      manga: this.getCustom<iManga>('Manga/get_all_manga'),
      mangaUtente: this.getMangaUtente(idUtente),
    });
  }

  getAllCanzoni(idUtente: string): Observable<CanzoniGet> {
    return forkJoin({
      canzoni: this.getCustom<Canzoni[]>('Manga/get_all_canzoni'),
      mangaUtente: this.getMangaUtente(idUtente),
    });
  }

  private getMangaUtente(idUtente: string): Observable<MangaUtente> {
    if (this.mangaUtente()) {
      return of(this.mangaUtente()!);
    } else {
      return this.getCustom<MangaUtente>(`Manga/get_manga_utente/${idUtente}`);
    }
  }
}
