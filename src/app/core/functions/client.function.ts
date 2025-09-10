import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

export interface IAppConfig {
  DB1: {
    KEY: string;
    STORAGE_KEY: string;
  };
  DB2: {
    KEY: string;
    STORAGE_KEY: string;
  };
  BE: {
    KEY: string;
  };
}

export interface IClient {
  c1: SupabaseClient<any, 'public', any>;
  c2: SupabaseClient<any, 'public', any>;
}

export function getClient(config: IAppConfig): IClient {
  const rr: Function = (s: string) => s.slice(0, -9);
  return {
    c1: createClient(rr(environment.DB1), config.DB1.KEY, {
      auth: {
        storageKey: config.DB1.STORAGE_KEY,
        detectSessionInUrl: false,
        autoRefreshToken: false,
        persistSession: true, // mantiene sessione persistente
        storage: localStorage,
      },
    }),

    c2: createClient(rr(environment.DB2), config.DB2.KEY, {
      auth: {
        storageKey: config.DB2.STORAGE_KEY,
        detectSessionInUrl: false,
        autoRefreshToken: false,
        persistSession: false, // disabilita sessione persistente
        storage: sessionStorage, // sessione temporanea isolata
      },
    }),
  };
}
