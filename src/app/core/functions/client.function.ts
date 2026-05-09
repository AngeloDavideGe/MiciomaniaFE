import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

export interface IAppConfig {
  HEADERS: {
    CS: {
      KEY: string;
    };
    PY: {
      KEY: string;
    };
    DB2: {
      KEY: string;
      STORAGE_KEY: string;
    };
  };
  maxElement: {
    message: number;
    elemPagine: number;
    postVisible: number;
  };
  defaultPicsUrl: {
    user: string;
    group: string;
    song: string;
    manga: string;
  };
}

export function getClient(config: IAppConfig): SupabaseClient {
  const rr: Function = (s: string) => s.slice(0, -9);

  return createClient(rr(environment.BE.DB2), config.HEADERS.DB2.KEY, {
    auth: {
      storageKey: config.HEADERS.DB2.STORAGE_KEY,
      detectSessionInUrl: false,
      autoRefreshToken: false,
      persistSession: false,
      storage: sessionStorage,
    },
  });
}
