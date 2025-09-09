import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { routes } from './app.routes';
import { AppConfigService } from './core/api/appConfig.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      })
    ),
    provideAppInitializer(() => {
      const configService = inject(AppConfigService);
      return configService.loadConfig();
    }),
  ],
};

export const configUrl = require('../assets/data/app.config');

export const supabase = {
  client1: createClient(configUrl.URL_SUPABASE1, configUrl.ANONKEY_SUPABASE1, {
    auth: {
      storageKey: configUrl.STORAGE_KEY_SUPABASE1,
      detectSessionInUrl: false,
      autoRefreshToken: false,
      persistSession: true, // mantiene sessione persistente
      storage: localStorage,
    },
  }),

  client2: createClient(configUrl.URL_SUPABASE2, configUrl.ANONKEY_SUPABASE2, {
    auth: {
      storageKey: configUrl.STORAGE_KEY_SUPABASE2,
      detectSessionInUrl: false,
      autoRefreshToken: false,
      persistSession: false, // disabilita sessione persistente
      storage: sessionStorage, // sessione temporanea isolata
    },
  }),
};
