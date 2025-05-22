export interface Regione {
  nome: string;
  codice: string;
  province: Provincia[];
}

export interface Provincia {
  nome: string;
  codice: string;
  codReg: string;
}
