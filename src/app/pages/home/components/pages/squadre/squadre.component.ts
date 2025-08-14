import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { ChatGroupService } from '../../../../../core/components/chat/services/chat-group.service';
import { loadSquadre } from '../../../../../shared/handlers/squadre.handler';
import { SquadreService } from '../../../../../shared/services/api/squadre.service';
import { LoadingService } from '../../../../../shared/services/template/loading.service';
import { BottoniSquadreComponent } from './components/bottoni-squadre.component';
import { ListaSquadreComponent } from './components/lista-squadre.component';
import { chartOptions } from './options/squadre.option';

declare var google: any;

@Component({
  selector: 'app-squadre',
  standalone: true,
  imports: [ListaSquadreComponent, BottoniSquadreComponent],
  templateUrl: './squadre.component.html',
})
export class SquadreComponent implements OnInit {
  private squadreService = inject(SquadreService);
  private resizeTimeout: any;
  private printListener: any;
  public stampa = signal<boolean>(false);

  private loadingService = inject(LoadingService);
  private chatService = inject(ChatGroupService);

  ngOnInit(): void {
    loadSquadre({
      squadreService: this.squadreService,
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

    this.squadreService.squadre.forEach((s) =>
      data.addRow([s.id, s.punteggio])
    );

    const chartContainer: HTMLElement | null = document.getElementById(idChart);
    if (!chartContainer) return;

    const chart = new google.visualization.BarChart(chartContainer);
    chart.draw(data, chartOptions);
  }

  captureElement() {
    this.chatService.chatVisibile.set(false);
    this.stampa.set(true);

    setTimeout(() => {
      this.renderChartCustom('chart_div_print');
      window.print();

      this.stampa.set(false);
      this.chatService.chatVisibile.set(true);

      setTimeout(() => {
        this.drawChart();
      }, 10);
    }, 10);
  }

  @HostListener('window:resize')
  onResize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => this.drawChart(), 200);
  }
}
