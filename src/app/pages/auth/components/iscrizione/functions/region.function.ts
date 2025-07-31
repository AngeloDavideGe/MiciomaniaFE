import { Provincia, Regione } from '../../../interfaces/region.interface';
import { regioniMock } from '../constants/regioni.constant';

export function getRegioniMap(): { nome: string; codice: string }[] {
  return regioniMock.map((x: Regione) => ({
    nome: x.nome,
    codice: x.codice,
  }));
}

export function getProvinceByRegione(codReg: string): Provincia[] {
  const regioneIndex: number = regioniMock.findIndex(
    (x: Regione) => x.codice == codReg
  );
  return regioneIndex > -1 ? regioniMock[regioneIndex].province : [];
}
