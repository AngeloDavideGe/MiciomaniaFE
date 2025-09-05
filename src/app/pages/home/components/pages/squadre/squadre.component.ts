import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { ChatGroupService } from '../../../../../core/components/chat/services/chat-group.service';
import { debounceTimeoutCustom } from '../../../../../shared/functions/utilities.function';
import { loadSquadre } from '../../../../../shared/handlers/squadre.handler';
import { SquadreService } from '../../../../../shared/services/api/squadre.service';
import { LoadingService } from '../../../../../shared/services/template/loading.service';
import { BottoniSquadreComponent } from './components/bottoni-squadre.component';
import { ListaSquadreComponent } from './components/lista-squadre.component';
import { chartOptions } from './options/squadre.option';
import { Squadre } from '../../../interfaces/profilo.interface';
import {
  SquadreLang,
  SquadreLangType,
} from './languages/interfaces/squadre-lang.interface';
import { Lingua } from '../../../../../shared/interfaces/http.interface';
import { DataHttp } from '../../../../../core/api/http.data';

declare var google: any;

@Component({
  selector: 'app-squadre',
  standalone: true,
  imports: [ListaSquadreComponent, BottoniSquadreComponent],
  templateUrl: './squadre.component.html',
})
export class SquadreComponent implements OnInit {
  private loadingService = inject(LoadingService);
  private chatService = inject(ChatGroupService);
  private squadreService = inject(SquadreService);

  public squadreLang: SquadreLang = {} as SquadreLang;
  public stampa = signal<boolean>(false);
  private renderChart: Function = this.renderChartCustom.bind(
    this,
    'chart_div'
  );

  constructor() {
    const lingua: Lingua = DataHttp.lingua();
    const languageMap: Record<Lingua, () => Promise<SquadreLangType>> = {
      it: () => import('./languages/constants/squadre-it.constant'),
      en: () => import('./languages/constants/squadre-en.constant'),
    };
    languageMap[lingua]().then((m) => (this.squadreLang = m.squadreLang));
  }

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
      callback: this.renderChart,
    });
  }

  private renderChartCustom(idChart: string): void {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Squadra');
    data.addColumn('number', 'Punteggio');

    this.squadreService.squadre.forEach((s: Squadre) =>
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

      setTimeout(() => {
        window.print();
        this.stampa.set(false);
        this.chatService.chatVisibile.set(true);

        setTimeout(() => this.renderChartCustom('chart_div'), 10);
      }, 10);
    }, 10);
  }

  @HostListener('window:resize')
  onResize = debounceTimeoutCustom(() => this.renderChartCustom('chart_div'));
}
