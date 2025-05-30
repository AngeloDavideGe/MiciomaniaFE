import { configUrl, headers, supabase } from '../app/app.config';

export const environment = {
  production: true,
  supabase: supabase,
  urlDB: `${configUrl.URL_SUPABASE}/rest/v1/`,
  urlBE: `http://localhost:5019/api/`,
  urlDeckCard: 'https://deckofcardsapi.com/api/deck',
  urlCardFrancesi: 'https://deckofcardsapi.com/static/img/',
  headerSupabase: headers.Supabase,
  headerRailway: headers.Railway,
  team: ['Alcamo', 'Miciomania'],
};
