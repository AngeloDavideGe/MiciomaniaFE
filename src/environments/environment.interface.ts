export interface IEnvironment {
  production: boolean;
  BE: {
    CS: string;
    PY: string;
    DB2: string;
  };
  maxElement: {
    message: number;
    elemPagine: number;
  };
  defaultPicsUrl: {
    user: string;
    group: string;
    song: string;
    manga: string;
  };
}
