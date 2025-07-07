import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CanzoniMiciomania } from '../../../shared/interfaces/elementiUtente.interface';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  public canzoniMiciomani: CanzoniMiciomania[] = [];
  public canzoniMiciomaniLoaded = false;

  constructor(private http: HttpClient) {
    this.loadCanzoniStorage();
  }

  getListaCanzoniMiciomani(): Observable<CanzoniMiciomania[]> {
    const url = environment.urlDB2 + 'rpc/get_all_canzoni';

    return this.http.get<CanzoniMiciomania[]>(url, {
      headers: environment.headerSupabase2,
    });
  }

  private loadCanzoniStorage(): void {
    const canzoniStorage = localStorage.getItem('canzoniMiciomani');
    if (canzoniStorage) {
      this.canzoniMiciomani = JSON.parse(canzoniStorage);
    }

    const canzoniLoaded = sessionStorage.getItem('canzoniMiciomaniLoaded');
    if (canzoniLoaded) {
      this.canzoniMiciomaniLoaded = JSON.parse(canzoniLoaded);
    }
  }
}
