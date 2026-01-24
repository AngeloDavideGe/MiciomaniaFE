import { Component, HostListener, Input, signal } from '@angular/core';
import { MappaItaliaComponent } from '../../../../../../../assets/components/italia.component';
import { debounceTimeoutCustom } from '../../../../../../shared/functions/utilities.function';
import { Conquiste } from '../../../../../../shared/interfaces/github.interface';
import { renderPieChartMap } from '../functions/draw.function';

declare var google: any;

@Component({
  selector: 'app-mappa-squadre',
  standalone: true,
  imports: [MappaItaliaComponent],
  template: `
    <div id="ContainerMap" class="mt-5">
      @if (loading()) {
        <div class="spinner-border text-dark rounded-circle" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      } @else {
        <div class="layout">
          <div class="chart-wrapper">
            <div id="chart_pie_mappa"></div>
          </div>

          <div class="map-wrapper">
            <app-mappa-italia
              [coloriRegioni]="coloriRegioni"
            ></app-mappa-italia>
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      #ContainerMap {
        width: 100%;
        max-width: 100vw;

        .layout {
          display: grid;
          grid-template-columns: minmax(260px, 320px) minmax(0, 1fr);
          align-items: start;
          width: 100%;

          .chart-wrapper {
            width: 100%;
            aspect-ratio: 1 / 1;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
            margin-top: 10rem;

            #chart_pie_mappa {
              width: 100%;
              height: 100%;
            }
          }

          .map-wrapper {
            width: 100%;
            min-width: 0;
            overflow: hidden;
            contain: layout paint;
          }
        }
      }

      @media (max-width: 1185px) {
        #ContainerMap {
          overflow-x: auto;

          .layout {
            grid-template-columns: 1fr;

            .chart-wrapper {
              max-width: 320px;
              margin: 0 auto;
            }
          }
        }
      }
    `,
  ],
})
export class MappaSquadreComponent {
  private conquiste: Conquiste = { conquistatori: {}, territori: {} };
  public chartConquiste: ChartConquiste[] = [];
  public colors: string[] = [];
  public coloriRegioni: Record<string, string> = {};
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
}

export interface ChartConquiste {
  proprietario: string;
  territori: number;
}
