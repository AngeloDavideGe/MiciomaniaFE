import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: false,
  BE_CS: 'http://localhost:5019/api/',
  BE_PY: 'http://localhost:5000/api/',
  DB2: 'https://qxstdfesxeseopikjayt.supabase.co/rest/v1/',
  team: [
    'Calandra Hunters',
    'Sirius Slayer',
    'Bau Boys Carlotta',
    'Nalol Screamers',
  ],
  colori: ['Red', 'Blue', 'Green', 'Purple'],
  maxMessagesForchat: 20,
  defaultPic:
    'https://png.pngtree.com/png-vector/20191009/ourlarge/pngtree-user-icon-png-image_1796659.jpg',
};
