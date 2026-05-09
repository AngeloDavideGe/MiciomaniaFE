import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: true,
  BE: {
    CS: 'http://localhost:5019/api/',
    PY: 'http://localhost:5000/api/',
    DB2: 'https://qxstdfesxeseopikjayt.supabase.co/rest/v1/',
  },
};
