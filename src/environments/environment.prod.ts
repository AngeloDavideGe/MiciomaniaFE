import { configUrl, headers, supabase } from '../app/app.config';

export const environment = {
  production: true,
  supabaseClient1: supabase.client1,
  supabaseClient2: supabase.client2,
  urlDB: `${configUrl.URL_SUPABASE}/rest/v1/`,
  urlDB2: `${configUrl.URL_SUPABASE2}/rest/v1/`,
  urlBE: `http://localhost:5019/api/`,
  urlDeckCard: 'https://deckofcardsapi.com/api/deck',
  urlCardFrancesi: 'https://deckofcardsapi.com/static/img/',
  headerSupabase: headers.Supabase,
  headerSupabase2: headers.Supabase2,
  headerBEMiciomania: headers.BEMiciomania,
  team: ['Alcamo', 'Miciomania'],
};
