import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { AppConfigService } from './core/api/appConfig.service';
import { loadingInterceptor } from '../library/interceptors/loading.interceptor';
import { errorInterceptor } from '../library/interceptors/error.interceptor';
import { tokenInterceptor } from '../library/interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        loadingInterceptor,
        errorInterceptor,
        tokenInterceptor,
      ]),
    ),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
    ),
    provideAppInitializer(async () => {
      const configService = inject(AppConfigService);
      await configService.loadConfig();
    }),
  ],
};
