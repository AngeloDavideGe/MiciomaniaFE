import { configUrl, defaultHeaders, supabase } from '../app/app.config';

export const environment = {
  production: false,
  supabase: supabase,
  urlDB: `${configUrl.URL_SUPABASE}/rest/v1/`,
  urlDeckCard: 'https://deckofcardsapi.com/api/deck',
  urlCardFrancesi: 'https://deckofcardsapi.com/static/img/',
  defaultHeaders: defaultHeaders,
  tokenGoFile: configUrl.TOKEN_ACCOUNT_GOFILE,
  team: ['Alcamo', 'Miciomania'],
};
