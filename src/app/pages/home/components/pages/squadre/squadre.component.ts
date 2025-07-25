import { Component, HostListener, inject, NgZone, OnInit } from '@angular/core';
import { SquadreHandler } from '../../../../../shared/handlers/squadre.handler';
import { LoadingService } from '../../../../../shared/services/template/loading.service';
import { ListaSquadreComponent } from './components/lista-squadre.component';
import { BottoniSquadreComponent } from './components/bottoni-squadre.component';
import { chartOptions } from './options/squadre.option';

declare var google: any;

@Component({
  selector: 'app-squadre',
  standalone: true,
  imports: [ListaSquadreComponent, BottoniSquadreComponent],
  templateUrl: './squadre.component.html',
})
export class SquadreComponent implements OnInit {
  private sc = inject(SquadreHandler);
  private resizeTimeout: any;
  private printListener: any;
  public stampa: boolean = false;

  private ngZone = inject(NgZone);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    this.sc.loadSquadre({
      ifCall: () => this.loadingService.show(),
      elseCall: () => this.drawChart(),
      nextCall: () => {
        this.loadingService.hide();
        this.drawChart();
      },
    });
  }

  private drawChart(): void {
    google.charts.load('current', {
      packages: ['corechart', 'bar'],
      callback: this.renderChart.bind(this),
    });
  }

  private renderChart(): void {
    this.renderChartCustom('chart_div');
  }

  private renderChartCustom(idChart: string): void {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Squadra');
    data.addColumn('number', 'Punteggio');

    this.sc.squadre.forEach((s) => data.addRow([s.id, s.punteggio]));

    const chartContainer: HTMLElement | null = document.getElementById(idChart);
    if (!chartContainer) return;

    const chart = new google.visualization.BarChart(chartContainer);
    chart.draw(data, chartOptions);
  }

  captureElement() {
    this.ngZone.run(() => {
      this.stampa = true;

      setTimeout(() => {
        this.renderChartCustom('chart_div_print');

        this.printListener = window.matchMedia('print');
        this.printListener.addListener((mql: MediaQueryList) => {
          if (!mql.matches) {
            this.cleanUpAfterPrint();
          }
        });

        setTimeout(() => window.print(), 10);
      }, 10);
    });
  }

  private cleanUpAfterPrint() {
    this.ngZone.run(() => {
      this.stampa = false;
      setTimeout(() => {
        google.charts.load('current', {
          packages: ['corechart', 'bar'],
          callback: () => this.renderChartCustom('chart_div'),
        });
      }, 10);
    });
  }

  @HostListener('window:resize')
  onResize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => this.drawChart(), 200);
  }
}
