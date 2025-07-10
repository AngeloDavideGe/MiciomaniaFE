import { HttpHeaders, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideInterceptor } from './app.interceptor';
import { routes } from './app.routes';
import { createClient } from '@supabase/supabase-js';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideInterceptor],
};

export const configUrl = require('./app.config.js');

export const headers = {
  Supabase: new HttpHeaders({
    apikey: configUrl.ANONKEY_SUPABASE,
    Authorization: `Bearer ${configUrl.ANONKEY_SUPABASE}`,
    'Content-Type': 'application/json',
  }),

  Supabase2: new HttpHeaders({
    apikey: configUrl.ANONKEY_SUPABASE2,
    Authorization: `Bearer ${configUrl.ANONKEY_SUPABASE2}`,
    'Content-Type': 'application/json',
  }),

  BEMiciomania: new HttpHeaders({
    apikey: configUrl.APIKEY_BE_MICIOMANIA,
    Authorization: `Bearer ${configUrl.APIKEY_BE_MICIOMANIA}`,
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
