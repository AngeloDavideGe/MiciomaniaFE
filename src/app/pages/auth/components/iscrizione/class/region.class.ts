import { Provincia, Regione } from '../../../interfaces/region.interface';
import { regioniMock } from '../../iscrizione/constants/regioni.constant';

export class Region {
  public getRegioniMap(): { nome: string; codice: string }[] {
    return regioniMock.map((x: Regione) => ({
      nome: x.nome,
      codice: x.codice,
    }));
  }

  public getProvinceByRegione(codReg: string): Provincia[] {
    const regioneIndex: number = regioniMock.findIndex(
      (x: Regione) => x.codice == codReg
    );
    return regioneIndex > -1 ? regioniMock[regioneIndex].province : [];
  }
}
