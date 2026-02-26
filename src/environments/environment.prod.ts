import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: true,
  BE: {
    CS: 'http://localhost:5019/api/',
    PY: 'http://localhost:5000/api/',
    DB2: 'https://qxstdfesxeseopikjayt.supabase.co/rest/v1/',
  },
  maxElement: {
    message: 20,
    elemPagine: 100,
  },
  defaultPicsUrl: {
    user: 'https://png.pngtree.com/png-vector/20191009/ourlarge/pngtree-user-icon-png-image_1796659.jpg',
    group:
      'https://icon-library.com/images/group-icon-png/group-icon-png-29.jpg',
    song: 'https://www.pngall.com/wp-content/uploads/5/Music-Note-PNG-High-Quality-Image.png',
    manga:
      'https://preview.redd.it/what-would-you-fix-about-solo-leveling-v0-byhgfo82276f1.jpeg?auto=webp&s=a0dd9c7bed2991f4d09500a7f83875dfb935583a',
  },
};
