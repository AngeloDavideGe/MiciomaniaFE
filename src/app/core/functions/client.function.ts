import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

export interface IAppConfig {
  BE_CS: {
    KEY: string;
  };
  BE_PY: {
    KEY: string;
  };
  DB2: {
    KEY: string;
    STORAGE_KEY: string;
  };
}

export function getClient(config: IAppConfig): SupabaseClient {
  const rr: Function = (s: string) => s.slice(0, -9);

  return createClient(rr(environment.DB2), config.DB2.KEY, {
    auth: {
      storageKey: config.DB2.STORAGE_KEY,
      detectSessionInUrl: false,
      autoRefreshToken: false,
      persistSession: false,
      storage: sessionStorage,
    },
  });
}
