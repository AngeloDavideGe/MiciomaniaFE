import { Forza4 } from '../../../interfaces/games.interfaces';

export class Forza4BotClass {
  public getColonnaSelezionata(campo: Forza4[][]): number {
    const colonneRandom = Array.from(
      { length: campo[0].length },
      (_, j) => j
    ).sort(() => Math.random() - 0.5);

    for (const j of colonneRandom) {
      if (campo.some((riga) => !riga[j].player && !riga[j].bot)) {
        return j;
      }
    }

    return -1;
  }
}
