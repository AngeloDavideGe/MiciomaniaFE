import { configUrl, headers, supabase } from '../app/app.config';

export const environment = {
  production: false,
  supabaseClient1: supabase.client1,
  supabaseClient2: supabase.client2,
  urlDB1: `${configUrl.URL_SUPABASE1}/rest/v1/`,
  urlDB2: `${configUrl.URL_SUPABASE2}/rest/v1/`,
  urlBE: `http://localhost:5019/api/`,
  headerSupabase: headers.Supabase1,
  headerSupabase2: headers.Supabase2,
  headerBEMiciomania: headers.BEMiciomania,
  team: ['Alcamo', 'Miciomania'],
};
