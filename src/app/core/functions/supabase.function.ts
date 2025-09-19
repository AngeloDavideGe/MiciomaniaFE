import { RealtimePostgresChangesFilter } from '@supabase/supabase-js';

export type RealTimeFilter = RealtimePostgresChangesFilter<any>;

export function getRealTimeFilter(
  schema: string,
  table: string
): RealTimeFilter {
  return {
    event: '*',
    schema: schema,
    table: table,
  } as RealTimeFilter;
}
