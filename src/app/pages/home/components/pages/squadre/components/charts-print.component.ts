import { Component, Input, OnInit } from '@angular/core';
import { Classifica } from '../../../../../../shared/interfaces/squadre.interface';
import { renderBarChart, renderPieChart } from '../functions/draw.function';

declare var google: any;

@Component({
  selector: 'app-chart-print',
  standalone: true,
  imports: [],
  template: `
    <div id="ChartsPrint" class="row mb-3">
      <div id="chart_bar_print" class="charts-class"></div>
    </div>

    <div id="ChartsPrint" class="row">
      <div id="chart_pie_print" class="charts-class"></div>
    </div>
  `,
  styles: [
    `
      #ChartsPrint {
        .charts-class {
          width: 80rem;
          height: 50rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          background: white;
          padding: 15px;
        }
      }
    `,
  ],
})
export class ChartsPrintComponent implements OnInit {
  @Input() classifica!: Classifica;

  ngOnInit(): void {
    google.charts.load('current', {
      packages: ['corechart', 'bar'],
      callback: () => {
        renderBarChart(
          this.classifica.giocatori,
          'chart_bar_print',
          this.classifica.squadre,
        );
        renderPieChart(this.classifica.squadre, 'chart_pie_print');
      },
    });
  }
}
