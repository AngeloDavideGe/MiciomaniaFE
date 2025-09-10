import { Component, HostListener, Input, OnInit } from '@angular/core';
import { debounceTimeoutCustom } from '../../../../../../shared/functions/utilities.function';
import { Squadre, TopUser } from '../../../../interfaces/profilo.interface';
import { renderBarChart, renderPieChart } from '../functions/draw.function';

declare var google: any;

@Component({
  selector: 'app-chart-custom',
  standalone: true,
  imports: [],
  template: `
    <div id="Charts" class="row mb-3">
      <div id="chart_bar" class="charts-class"></div>
    </div>

    <div id="Charts" class="row mb-3">
      <div id="chart_pie" class="charts-class"></div>
    </div>
  `,
  styles: [
    `
      #Charts {
        .charts-class {
          width: 100%;
          height: 30rem;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          background: white;
          padding: 15px;
        }
      }
    `,
  ],
})
export class ChartsComponent implements OnInit {
  @Input() topUser!: TopUser[];
  @Input() squadre!: Squadre[];

  ngOnInit(): void {
    google.charts.load('current', {
      packages: ['corechart', 'bar'],
      callback: () => {
        renderBarChart(this.topUser, 'chart_bar');
        renderPieChart(this.squadre, 'chart_pie');
      },
    });
  }

  @HostListener('window:resize')
  onResize = debounceTimeoutCustom(() => {
    renderBarChart(this.topUser, 'chart_bar');
    renderPieChart(this.squadre, 'chart_pie');
  });
}
