import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { getClient, IAppConfig, IClient } from '../functions/client.function';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private http = inject(HttpClient);

  public config: IAppConfig = {} as IAppConfig;
  public client: IClient = {} as IClient;

  loadConfig(): Promise<void> {
    return firstValueFrom(
      this.http.get<IAppConfig>('assets/data/appConfig.json')
    )
      .then((config: IAppConfig) => {
        this.config = config;
        this.client = getClient(config);
      })
      .catch((err) => {
        console.error('Errore caricamento appConfig.json', err);
        this.config = {} as IAppConfig;
      });
  }
}
