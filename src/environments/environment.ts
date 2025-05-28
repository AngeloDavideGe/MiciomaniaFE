import {
  configUrl,
  headerRailway,
  headerSupabase,
  supabase,
} from '../app/app.config';

export const environment = {
  production: false,
  supabase: supabase,
  urlDB: `${configUrl.URL_SUPABASE}/rest/v1/`,
  urlBE: `http://localhost:5019/api/`,
  urlDeckCard: 'https://deckofcardsapi.com/api/deck',
  urlCardFrancesi: 'https://deckofcardsapi.com/static/img/',
  headerSupabase: headerSupabase,
  headerRailway: headerRailway,
  tokenGoFile: configUrl.TOKEN_ACCOUNT_GOFILE,
  team: ['Alcamo', 'Miciomania'],
};
