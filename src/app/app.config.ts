import { HttpHeaders, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      })
    ),
    provideHttpClient(),
  ],
};

export const configUrl = require('./app.config.js');

export const headers = {
  Supabase1: new HttpHeaders({
    apikey: configUrl.ANONKEY_SUPABASE1,
    Authorization: `Bearer ${configUrl.ANONKEY_SUPABASE1}`,
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
