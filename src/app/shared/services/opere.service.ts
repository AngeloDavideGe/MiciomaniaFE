import { HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../library/services/base.service';
import { AllManga } from '../interfaces/opere.interface';

@Injectable({
  providedIn: 'root',
})
export class OpereService extends BaseService {
  public manga = signal<AllManga | null>(null);
  public mangaLoaded: boolean = false;

  constructor() {
    super('CS');
  }

  getAllManga(idUtente: string): Observable<AllManga> {
    const params = new HttpParams().set('idUtente', idUtente);

    return this.getCustom<AllManga>('Manga/get_all_manga_e_preferiti', {
      params: params,
    });
  }
}
