import { HttpHeaders, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideInterceptor } from './app.interceptor';
import { routes } from './app.routes';
import { createClient } from '@supabase/supabase-js';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideInterceptor],
};

export const configUrl = require('../assets/app.config');

export const headers = {
  Supabase: new HttpHeaders({
    apikey: configUrl.ANONKEY_SUPABASE,
    Authorization: `Bearer ${configUrl.ANONKEY_SUPABASE}`,
    'Content-Type': 'application/json',
  }),

  Railway: new HttpHeaders({
    apikey: configUrl.APIKEY_RAILWAY,
    Authorization: `Bearer ${configUrl.APIKEY_RAILWAY}`,
  }),
};

export const supabase = createClient(
  configUrl.URL_SUPABASE,
  configUrl.ANONKEY_SUPABASE,
  {
    auth: {
      storageKey: configUrl.STORAGE_KEY_SUPABASE,
      detectSessionInUrl: false,
      autoRefreshToken: false,
      persistSession: true,
      storage: localStorage,
    },
  }
);
