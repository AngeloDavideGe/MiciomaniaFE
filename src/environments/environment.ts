import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: false,
  BE: {
    CS: 'http://localhost:5019/api/',
    PY: 'http://localhost:5000/api/',
    DB2: 'https://qxstdfesxeseopikjayt.supabase.co/rest/v1/',
  },
  maxMessagesForchat: 20,
  defaultPicsUrl: {
    user: 'https://png.pngtree.com/png-vector/20191009/ourlarge/pngtree-user-icon-png-image_1796659.jpg',
    group:
      'https://icon-library.com/images/group-icon-png/group-icon-png-29.jpg',
    song: 'https://www.pngall.com/wp-content/uploads/5/Music-Note-PNG-High-Quality-Image.png',
    manga:
      'https://images-eu.ssl-images-amazon.com/images/I/71iZXbEMvXL._AC_UL210_SR210,210_.jpg',
  },
};
