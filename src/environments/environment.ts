import { supabase } from '../app/app.config';

export const environment = {
  production: false,
  supabaseClient1: supabase.client1,
  supabaseClient2: supabase.client2,
  urlDB1: `https://iucsdhcxoqfqqrhrdwcz.supabase.co/rest/v1/`,
  urlDB2: `https://qxstdfesxeseopikjayt.supabase.co/rest/v1/`,
  urlBE: `http://localhost:5019/api/`,
  team: ['Calandra Hunters', 'Sirius Slayer', 'Bau Boys Carlotta'],
  colori: ['Red', 'Blue', 'Green'],
};
