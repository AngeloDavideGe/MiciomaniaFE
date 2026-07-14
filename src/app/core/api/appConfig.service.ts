import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { handlerFuncAsync } from '../../../library/functions/handler.function';
import { getClient } from '../functions/client.function';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private http = inject(HttpClient);

  public config!: IAppConfig;
  public client!: SupabaseClient;

  public loadConfig(): Promise<void> {
    return handlerFuncAsync<IAppConfig>({
      callHttp: () => this.http.get<IAppConfig>('assets/data/appConfig.json'),
      nextCall: (config: IAppConfig) => {
        this.config = config;
        this.client = getClient(config);
      },
    });
  }
}

export interface IAppConfig {
  HEADERS: {
    CS: {
      KEY: string;
    };
    PY: {
      KEY: string;
    };
    DB2: {
      KEY: string;
      STORAGE_KEY: string;
    };
  };
  maxElement: {
    message: number;
    elemPagine: number;
    postVisible: number;
    notifiche: number;
  };
  defaultPicsUrl: {
    user: string;
    group: string;
    song: string;
    manga: string;
  };
}
