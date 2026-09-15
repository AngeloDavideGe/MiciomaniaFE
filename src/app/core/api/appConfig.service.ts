import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import {
  handlerFunc,
  handlerFuncAsync,
} from '../../../library/functions/handler.function';
import { IAppConfig } from '../interfaces/appConfig.interface';
import { ILang } from '../interfaces/lang.interface';

import { LOADING_CONTEXT } from '../../../library/interceptors/loading.interceptor';
import {
  getStoredCurrentLang,
  getStoredCurrentCursor,
} from '../functions/storage.getFunction';

interface IConfigService {
  config: IAppConfig;
  lang: ILang;
}

export enum LangEnum {
  it = 'it',
  en = 'en',
}

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private http = inject(HttpClient);

  public currentLang = signal<LangEnum>(getStoredCurrentLang());
  public currentCursor = signal<string>(getStoredCurrentCursor());

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

  public changeLang(lingua: LangEnum): void {
    handlerFunc<ILang>({
      callHttp: () =>
        this.http.get<ILang>(`assets/lang/lang.${lingua}.json`, {
          context: new HttpContext().set(LOADING_CONTEXT, true),
        }),
      nextCall: (data: ILang) => {
        this.lang = data;
        this.currentLang.set(lingua);
      },
    });
  }
}
