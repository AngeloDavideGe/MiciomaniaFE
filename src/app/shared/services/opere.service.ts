import { HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../library/services/base.service';
import { AllManga, Canzoni } from '../interfaces/opere.interface';

@Injectable({
  providedIn: 'root',
})
export class OpereService extends BaseService {
  public manga = signal<AllManga | null>(null);
  public canzoni = signal<Canzoni[]>([]);

  public mangaLoaded: boolean = false;
  public canzoniLoaded: boolean = false;

  constructor() {
    super('CS');
  }

  getAllManga(idUtente: string): Observable<AllManga> {
    const params = new HttpParams().set('idUtente', idUtente);

    return this.getCustom<AllManga>('Manga/get_all_manga_e_preferiti', {
      params: params,
    });
  }

  getAllCanzoni(): Observable<Canzoni[]> {
    return this.getCustom<Canzoni[]>('Manga/get_all_canzoni');
  }
}
