import { Component, HostListener, Input, signal } from '@angular/core';
import {
  PathSvgCustom,
  SvgCustomComponent,
} from '../../../../../../../assets/components/svg-custom.component';
import { debounceTimeoutCustom } from '../../../../../../shared/functions/utilities.function';
import {
  Conquiste,
  Mappa,
} from '../../../../../../shared/interfaces/github.interface';
import { renderPieChartMap } from '../functions/draw.function';
import { PATH_REGIONI } from '../constants/path-regioni.constant';
import { SpinnerComponent } from '../../../../../../shared/components/dialogs/spinner.component';

declare var google: any;

@Component({
  selector: 'app-mappa-squadre',
  standalone: true,
  imports: [SvgCustomComponent, SpinnerComponent],
  template: `
    <div id="ContainerMap" class="mt-5">
      @if (loading()) {
        <app-spinner></app-spinner>
      } @else {
        <div class="layout">
          <div class="chart-wrapper">
            <div id="chart_pie_mappa"></div>
          </div>

          <div class="map-wrapper mt-4">
            <app-svg-custom
              [paths]="paths"
              [colori]="coloriRegioni"
              [translate]="'translate(-120, -40)'"
              [width]="750"
              [height]="850"
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

        .layout {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;

          .chart-wrapper {
            flex: 0 0 300px;
            aspect-ratio: 1 / 1;
            padding: 1.2rem;
            background: #f8f9fa;
            border-radius: 14px;
            box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
            border: 2px solid #83b2e3;
            margin-top: 2rem;

            #chart_pie_mappa {
              width: 100%;
              height: 100%;
            }
          }

          .map-wrapper {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            min-width: 0;
          }

          @media (min-width: 1800px) {
            padding: 1rem 25rem;
          }

          @media (min-width: 1400px) and (max-width: 1799px) {
            padding: 1rem 10rem;
          }

          @media (min-width: 1065px) and (max-width: 1399px) {
            padding: 1rem 1rem;
          }

          @media (max-width: 1064px) {
            flex-direction: column;
            align-items: center;

            .chart-wrapper {
              margin-top: 2em;
            }

            .map-wrapper {
              justify-content: center;
            }
          }
        }
      }
    `,
  ],
})
export class MappaSquadreComponent {
  public readonly paths: PathSvgCustom[] = PATH_REGIONI;
  private conquiste: Conquiste = { conquistatori: {}, territori: {} };
  public chartConquiste: ChartConquiste[] = [];
  public colors: string[] = [];
  public coloriRegioni: Record<string, string> = {};
  public territorioAperto = signal<Mappa | null>(null);
  public loading = signal<boolean>(true);

  @Input() set setConquiste(value: Conquiste | null) {
    if (value) {
      this.conquiste = value;
      this.colors = Object.values(value.conquistatori);

      const regioni: string[] = Object.keys(this.conquiste.territori);
      const conquistatori: string[] = Object.keys(this.conquiste.conquistatori);
      const classifica: Record<string, number> = {};

      regioni.forEach((regione: string) => {
        const proprietario: string = value.territori[regione].proprietario;
        this.coloriRegioni[regione] = value.conquistatori[proprietario];
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
          );
        },
      });

      this.loading.set(false);
    }
  }

  @HostListener('window:resize')
  onResize = debounceTimeoutCustom(() => {
    renderPieChartMap(this.chartConquiste, this.colors, 'chart_pie_mappa');
  });

  public openLegend(regionId: string): void {
    const conquista: Mappa = this.conquiste.territori[regionId];
    this.territorioAperto.set(conquista);
  }
}

export interface ChartConquiste {
  proprietario: string;
  territori: number;
}
