import { Component, Input, OnInit } from '@angular/core';
import { Squadre, TopUser } from '../../../../interfaces/profilo.interface';
import { renderBarChart, renderPieChart } from '../functions/draw.function';

declare var google: any;

@Component({
  selector: 'app-chart-print',
  standalone: true,
  imports: [],
  template: `
    <div id="chart_bar_print" class="chart-print-container bar-chart"></div>

    <div id="chart_pie_print" class="chart-print-container"></div>
  `,
  styles: [
    `
      .chart-print-container {
        width: 65rem;
        height: 30rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        background: white;
        padding: 15px;

        &.bar-chart {
          margin-bottom: 2rem;
        }
      }
    `,
  ],
})
export class ChartsPrintComponent implements OnInit {
  @Input() topUser!: TopUser[];
  @Input() squadre!: Squadre[];

  ngOnInit(): void {
    google.charts.load('current', {
      packages: ['corechart', 'bar'],
      callback: () => {
        renderBarChart(this.topUser, 'chart_bar_print');
        renderPieChart(this.squadre, 'chart_pie_print');
      },
    });
  }
}
