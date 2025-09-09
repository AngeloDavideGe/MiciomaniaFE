import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root', // il servizio è disponibile globalmente
})
export class AppConfigService {
  private http = inject(HttpClient);

  public config: any;

  loadConfig(): Promise<void> {
    return firstValueFrom(this.http.get('assets/data/appConfig.json'))
      .then((config) => {
        this.config = config;
      })
      .catch((err) => {
        console.error('Errore caricamento appConfig.json', err);
        this.config = {};
      });
  }

  get(key: string) {
    return this.config ? this.config[key] : null;
  }
}
