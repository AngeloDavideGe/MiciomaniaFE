import { BotPlay } from '../../../interfaces/games.interfaces';

interface Coordinate {
  i: number;
  j: number;
}

export class BotBattagliaNavale {
  public botHaColpito: Coordinate | null = null;

  public getCoordinateBot(bp: BotPlay): Coordinate {
    const naveColpita: Coordinate | null = this.naveColpita(bp);
    return naveColpita ? naveColpita : this.naveNonColpita(bp);
  }

  private naveColpita(bp: BotPlay): Coordinate | null {
    if (!this.botHaColpito) {
      return null;
    }

    const { i, j }: Coordinate = structuredClone(this.botHaColpito);
    this.botHaColpito = null;

    const celleConNave: Coordinate[] = [];

    if (
      i - 1 >= 0 &&
      !bp.cella[i - 1][j].cellaColpita &&
      (bp.cella[i - 1][j].naveGrande || bp.cella[i - 1][j].navePiccola)
    ) {
      celleConNave.push({ i: i - 1, j });
    }

    if (
      j + 1 < bp.dimGriglia &&
      !bp.cella[i][j + 1].cellaColpita &&
      (bp.cella[i][j + 1].naveGrande || bp.cella[i][j + 1].navePiccola)
    ) {
      celleConNave.push({ i, j: j + 1 });
    }

    if (
      j - 1 >= 0 &&
      !bp.cella[i][j - 1].cellaColpita &&
      (bp.cella[i][j - 1].naveGrande || bp.cella[i][j - 1].navePiccola)
    ) {
      celleConNave.push({ i, j: j - 1 });
    }

    if (
      i + 1 < bp.dimGriglia &&
      !bp.cella[i + 1][j].cellaColpita &&
      (bp.cella[i + 1][j].naveGrande || bp.cella[i + 1][j].navePiccola)
    ) {
      celleConNave.push({ i: i + 1, j });
    }

    celleConNave.sort(() => Math.random() - 0.5);

    if (celleConNave.length > 0) {
      return celleConNave[0];
    }

    return null;
  }

  private naveNonColpita(bp: BotPlay): Coordinate {
    const celleLiberePlayer: Coordinate[] = this.getCelleLibere(bp);
    const num: number = Math.floor(Math.random() * celleLiberePlayer.length);
    return celleLiberePlayer[num];
  }

  private getCelleLibere(bp: BotPlay): Coordinate[] {
    const celleLiberePlayer = [] as Coordinate[];

    for (let i = 0; i < bp.dimGriglia; i++) {
      for (let j = 0; j < bp.dimGriglia; j++) {
        if (!bp.cella[i][j].cellaColpita) {
          celleLiberePlayer.push({ i, j });
        }
      }
    }

    return celleLiberePlayer;
  }
}
