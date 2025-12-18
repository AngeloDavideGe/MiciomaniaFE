import { Component, HostListener, Input, OnInit } from '@angular/core';
import { debounceTimeoutCustom } from '../../../../../../shared/functions/utilities.function';
import { renderBarChart, renderPieChart } from '../functions/draw.function';
import {
  Squadre,
  Giocatori,
} from '../../../../../../shared/interfaces/squadre.interface';

declare var google: any;

@Component({
  selector: 'app-chart-custom',
  standalone: true,
  imports: [],
  template: `
    <div id="Charts" class="row mb-3">
      <div id="chart_bar" class="charts-class"></div>
    </div>

    <div id="Charts" class="row">
      <div id="chart_pie" class="charts-class"></div>
    </div>
  `,
  styles: [
    `
      #Charts {
        .charts-class {
          width: 100%;
          height: 30rem;
          border: 1px solid #695555ff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          background: #eaeaea;
          padding: 15px;
        }
      }
    `,
  ],
})
export class ChartsComponent implements OnInit {
  @Input() giocatori!: Giocatori[];
  @Input() squadre!: Squadre[];

  ngOnInit(): void {
    google.charts.load('current', {
      packages: ['corechart', 'bar'],
      callback: () => {
        renderBarChart(this.giocatori, 'chart_bar', this.squadre);
        renderPieChart(this.squadre, 'chart_pie');
      },
    });
  }

  @HostListener('window:resize')
  onResize = debounceTimeoutCustom(() => {
    renderBarChart(this.giocatori, 'chart_bar', this.squadre);
    renderPieChart(this.squadre, 'chart_pie');
  });
}
