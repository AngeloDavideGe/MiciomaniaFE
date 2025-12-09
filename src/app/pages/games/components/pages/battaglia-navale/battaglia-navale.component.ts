import { Component, OnInit } from '@angular/core';
import { setPunteggioOttenuto } from '../../../../../shared/handlers/squadre.handler';
import { NumNavi } from '../../../enums/games.enum';
import {
  CellaOccupata,
  CelleBattaglia,
  NavaleCell,
  Nave,
  PosizionaNave,
} from '../../../interfaces/games.interfaces';
import { GamesBase } from '../../../shared/base/games.base';
import { DettagliGameComponent } from '../../../shared/components/dettagli-game.component';
import { BotBattagliaNavale } from './bot/battaglia-navale.bot';
import {
  cellaOccupata,
  controlloCasuale,
} from './utilities/battaglia-navale.utilities';
import { boardEmpty } from '../../../functions/games.function';
import { navaleCellEmpty } from '../../../constants/boardEmpty.const';

@Component({
  selector: 'app-battaglia-navale',
  standalone: true,
  imports: [DettagliGameComponent],
  templateUrl: './battaglia-navale.component.html',
})
export class BattagliaNavaleComponent extends GamesBase implements OnInit {
  public keysCelle: (keyof CelleBattaglia)[] = ['cellaPlayer', 'cellaBot'];
  private botBN = new BotBattagliaNavale();
  private dimGriglia: number = 6;
  private numNavi = NumNavi;
  public celle: CelleBattaglia = {
    cellaPlayer: [] as NavaleCell[][],
    cellaBot: [] as NavaleCell[][],
  };
  private naviRimanenti = {
    Player: 0,
    Bot: 0,
  };

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.iniziaGioco();
  }

  private iniziaGioco(): void {
    this.celle = {
      cellaPlayer: boardEmpty<NavaleCell>(this.dimGriglia, navaleCellEmpty),
      cellaBot: boardEmpty<NavaleCell>(this.dimGriglia, navaleCellEmpty),
    };
    this.celleCasuali();
    this.inizializzaNaviRimaste();
  }

  private inizializzaNaviRimaste(): void {
    const numNavi: number = this.numNavi.Grandi * 3 + this.numNavi.Piccole * 2;
    this.naviRimanenti.Player = structuredClone(numNavi);
    this.naviRimanenti.Bot = structuredClone(numNavi);
  }

  private celleCasuali(): void {
    for (const key of this.keysCelle) {
      const navi: Nave[] = [
        {
          numNavi: this.numNavi.Grandi,
          lunghezzaNave: 3,
          keyCell: key,
          tipoNave: 'naveGrande',
        },
        {
          numNavi: this.numNavi.Piccole,
          lunghezzaNave: 2,
          keyCell: key,
          tipoNave: 'navePiccola',
        },
      ];

      for (const nave of navi) {
        this.posizionaNavi(nave);
      }
    }
  }

  private posizionaNavi(nave: Nave): void {
    for (let i = 0; i < nave.numNavi; i++) {
      const maxTentativi: number = 100;
      let posizioneValida: boolean = false;
      let tentativi: number = 0;

      while (!posizioneValida && tentativi < maxTentativi) {
        const riga: number = Math.floor(Math.random() * this.dimGriglia);
        const colonna: number = Math.floor(
          Math.random() * (this.dimGriglia - nave.lunghezzaNave + 1)
        );

        const pn: PosizionaNave = {
          riga: riga,
          colonna: colonna,
          dimGriglia: this.dimGriglia,
          celle: this.celle,
          nave: nave,
        };

        posizioneValida = controlloCasuale(pn);
        tentativi++;
      }
    }
  }

  colpisciCella(cellOcc: CellaOccupata): void {
    const { i, j, key }: CellaOccupata = cellOcc;
    if (this.celle.cellaBot[i][j].cellaColpita || key == 'cellaPlayer') {
      return;
    }

    this.celle.cellaBot[i][j].cellaColpita = true;

    if (cellaOccupata(this.pn(cellOcc))) {
      this.naviRimanenti.Bot--;
      if (this.naviRimanenti.Bot == 0) {
        this.alertGameService.alert('vittoria');
        setPunteggioOttenuto(3);
        this.iniziaGioco();
        return;
      }
    }
    this.botPlay();
  }

  private botPlay(): void {
    const { i, j } = this.botBN.getCoordinateBot({
      cella: this.celle.cellaPlayer,
      dimGriglia: this.dimGriglia,
    });

    const cellOcc: CellaOccupata = { i, j, key: 'cellaPlayer' };
    this.celle.cellaPlayer[i][j].cellaColpita = true;

    if (cellaOccupata(this.pn(cellOcc))) {
      this.controlloSconfitta(i, j);
    }
  }

  private controlloSconfitta(i: number, j: number): void {
    this.naviRimanenti.Player--;
    this.botBN.botHaColpito = { i, j };
    if (this.naviRimanenti.Player == 0) {
      this.alertGameService.alert('sconfitta');
      setPunteggioOttenuto(-2);
      this.iniziaGioco();
    }
  }

  private pn(cellOcc: CellaOccupata): PosizionaNave {
    const nave: Nave = {} as Nave;
    nave.keyCell = cellOcc.key;

    const pn: PosizionaNave = {
      riga: cellOcc.i,
      colonna: cellOcc.j,
      dimGriglia: this.dimGriglia,
      celle: this.celle,
      nave: nave,
    };

    return pn;
  }
}
