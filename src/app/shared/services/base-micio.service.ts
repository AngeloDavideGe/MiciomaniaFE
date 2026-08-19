import { HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { BaseService } from '../../../library/services/base.service';
import { environment } from '../../../environments/environment';
import { AppConfigService } from '../../core/api/appConfig.service';

export type MicioDatabase = 'CS' | 'PY' | 'DB2';

export abstract class BaseMicioService extends BaseService {
  protected readonly appConfig: AppConfigService;

  constructor(db: MicioDatabase) {
    const appConfig = inject(AppConfigService);
    const key = appConfig.config.HEADERS[db].KEY;

    super({
      baseUrl: environment.BE[db],
      headers: new HttpHeaders({
        apikey: key,
        Authorization: `Bearer ${key}`,
      }),
    });

    this.appConfig = appConfig;
  }
}
