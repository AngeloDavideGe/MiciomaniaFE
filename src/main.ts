import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { AppConfigService } from './app/core/api/appConfig.service';
import { errorInterceptor } from './library/interceptors/error.interceptor';
import { loadingInterceptor } from './library/interceptors/loading.interceptor';

const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        loadingInterceptor,
        errorInterceptor,
        // tokenInterceptor,
      ]),
    ),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
    ),
    provideAppInitializer(
      async () => await inject(AppConfigService).loadConfig(),
    ),
  ],
};

bootstrapApplication(AppComponent, appConfig)
  .then(() => {})
  .catch((err: Error) => console.error(err));
