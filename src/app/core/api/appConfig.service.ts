import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { handlerFuncAsync } from '../../../library/functions/handler.function';
import { getClient, IAppConfig } from '../functions/client.function';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private http = inject(HttpClient);

  public config: IAppConfig = {} as IAppConfig;
  public client: SupabaseClient = {} as SupabaseClient;

  public async loadConfig(): Promise<void> {
    return handlerFuncAsync<IAppConfig>({
      callHttp: () => this.http.get<IAppConfig>('assets/data/appConfig.json'),
      nextCall: (config: IAppConfig) => {
        this.config = config;
        this.client = getClient(config);
      },
    });
  }
}
