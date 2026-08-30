import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { handlerFuncAsync } from '../../../library/functions/handler.function';
import { IAppConfig } from '../interfaces/appConfig.interface';
import { ILang } from '../interfaces/lang.interface';

interface IConfigService {
  config: IAppConfig;
  lang: ILang;
}

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private http = inject(HttpClient);
  private currentLang = signal<'it' | 'en'>('it');

  public config!: IAppConfig;
  public lang!: ILang;

  public loadConfig(): Promise<void> {
    return handlerFuncAsync<IConfigService>({
      callHttp: () =>
        forkJoin({
          config: this.http.get<IAppConfig>('assets/data/appConfig.json'),
          lang: this.http.get<ILang>(
            `assets/lang/lang.${this.currentLang()}.json`,
          ),
        }),
      nextCall: (data: IConfigService) => {
        this.config = data.config;
        this.lang = data.lang;
      },
    });
  }
}
