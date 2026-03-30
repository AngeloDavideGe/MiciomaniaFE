import { NgClass } from '@angular/common';
import { Component, HostListener, Input, signal } from '@angular/core';
import {
  PathSvgCustom,
  SvgCustomComponent,
} from '../../../../../../../assets/components/svg-custom.component';
import { SpinnerComponent } from '../../../../../../shared/components/dialogs/spinner.component';
import { debounceTimeoutCustom } from '../../../../../../shared/functions/utilities.function';
import {
  Conquiste,
  Mappa,
} from '../../../../../../shared/interfaces/github.interface';
import { renderPieChartMap } from '../functions/draw.function';

declare var google: any;

@Component({
  selector: 'app-mappa-squadre',
  standalone: true,
  imports: [SvgCustomComponent, SpinnerComponent, NgClass],
  template: `
    <div id="ContainerMap">
      @if (loading()) {
        <app-spinner [mt]="'5rem'"></app-spinner>
      } @else {
        <div [ngClass]="classNg()">
          <div class="chart-wrapper">
            <div id="chart_pie_mappa"></div>
          </div>

          <div class="mt-3">
            <app-svg-custom
              [paths]="paths"
              [colori]="coloriRegioni"
              [viewbox]="viewBox"
              [translate]="translate"
              [width]="dim[0]"
              [height]="dim[1]"
              [modale]="territorioAperto()"
              (pathClicked)="openLegend($event)"
            ></app-svg-custom>
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      #ContainerMap {
        width: 100%;

        .chart-wrapper {
          flex: 0 0 300px;
          aspect-ratio: 1 / 1;
          padding: 1.2rem;
          background: var(--bg-light);
          border-radius: 14px;
          box-shadow: 0 10px 24px var(--border-light);
          border: 2px solid var(--primary-color);
          margin-top: 2rem;

          #chart_pie_mappa {
            width: 100%;
            height: 100%;
          }
        }
      }
    `,
  ],
})
export class MappaSquadreComponent {
  public chartConquiste: ChartConquiste[] = [];
  public colors: string[] = [];
  public coloriRegioni: Record<string, string> = {};
  public territorioAperto = signal<Mappa | null>(null);
  public loading = signal<boolean>(true);
  public classNg = signal<string>(this.posizioneElem);
  private conquiste: Conquiste = {
    conquistatori: {},
    territori: {},
    muscoli: {},
  };

  private get posizioneElem(): string {
    if (window.innerWidth > 994) {
      return 'elementi-laterali container';
    } else if (window.innerWidth >= 892) {
      return 'elementi-laterali';
    } else {
      return 'elementi-colonna';
    }
  }

  @Input() paths!: PathSvgCustom[];
  @Input() titleChart: string = 'Territori Conquistati';
  @Input() viewBox: string = '0 0 750 850';
  @Input() translate: string = 'translate(-120, -40)';
  @Input() dim: number[] = [550, 650];
  @Input() keyConquiste: keyof Conquiste = 'territori';

  @Input() set setConquiste(value: Conquiste | null) {
    if (value) {
      this.conquiste = value;
      this.colors = Object.values(this.conquiste.conquistatori);

      const regioni: string[] = Object.keys(this.conquiste[this.keyConquiste]);
      const conquistatori: string[] = Object.keys(this.conquiste.conquistatori);
      const classifica: Record<string, number> = {};

      regioni.forEach((regione: string) => {
        const reg: string | Mappa = this.conquiste[this.keyConquiste][regione];
        const proprietario: string = (reg as Mappa).proprietario;
        this.coloriRegioni[regione] =
          this.conquiste.conquistatori[proprietario];
        classifica[proprietario] = (classifica[proprietario] || 0) + 1;
      });

      this.chartConquiste = conquistatori.map((proprietario: string) => ({
        proprietario,
        territori: classifica[proprietario] || 0,
      }));

      google.charts.load('current', {
        packages: ['corechart', 'bar'],
        callback: () => {
          renderPieChartMap(
            this.chartConquiste,
            this.colors,
            'chart_pie_mappa',
            this.titleChart,
          );
        },
      });

      this.loading.set(false);
    }
  }

  @HostListener('window:resize')
  onResize = debounceTimeoutCustom(() => {
    renderPieChartMap(
      this.chartConquiste,
      this.colors,
      'chart_pie_mappa',
      this.titleChart,
    );
    this.classNg.set(this.posizioneElem);
  });

  public openLegend(regionId: string): void {
    const conquista: Mappa | string =
      this.conquiste[this.keyConquiste][regionId];
    this.territorioAperto.set(conquista as Mappa);
  }
}

export interface ChartConquiste {
  proprietario: string;
  territori: number;
}
