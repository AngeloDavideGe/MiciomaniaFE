import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { IAppConfig } from '../api/appConfig.service';
import { RealtimePostgresChangesFilter } from '@supabase/supabase-js';

export type RealTimeFilter = RealtimePostgresChangesFilter<any>;

export function getRealTimeFilter(
  schema: string,
  table: string,
): RealTimeFilter {
  return {
    event: '*',
    schema: schema,
    table: table,
  } as RealTimeFilter;
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
