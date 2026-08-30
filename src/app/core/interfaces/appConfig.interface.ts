export interface IAppConfig {
  HEADERS: {
    CS: {
      KEY: string;
    };
    PY: {
      KEY: string;
    };
    DB2: {
      KEY: string;
      STORAGE_KEY: string;
    };
  };
  maxElement: {
    users: number;
    elemPagine: number;
    postVisible: number;
    notifiche: number;
  };
  defaultPicsUrl: {
    user: string;
    group: string;
    song: string;
    manga: string;
  };
}
