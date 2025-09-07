import { Component, inject, OnInit, signal } from '@angular/core';
import { DataHttp } from '../../../../../core/api/http.data';
import { ChatGroupService } from '../../../../../core/components/chat/services/chat-group.service';
import { loadSquadre } from '../../../../../shared/handlers/squadre.handler';
import { Lingua } from '../../../../../shared/interfaces/http.interface';
import { SquadreService } from '../../../../../shared/services/api/squadre.service';
import { LoadingService } from '../../../../../shared/services/template/loading.service';
import { BottoniSquadreComponent } from './components/bottoni-squadre.component';
import { ChartsPrintComponent } from './components/charts-print.component';
import { ChartsComponent } from './components/charts.component';
import { ListaSquadreComponent } from './components/lista-squadre.component';
import {
  SquadreLang,
  SquadreLangType,
} from './languages/interfaces/squadre-lang.interface';

@Component({
  selector: 'app-squadre',
  standalone: true,
  imports: [
    ListaSquadreComponent,
    BottoniSquadreComponent,
    ChartsComponent,
    ChartsPrintComponent,
  ],
  templateUrl: './squadre.component.html',
})
export class SquadreComponent implements OnInit {
  private loadingService = inject(LoadingService);
  private chatService = inject(ChatGroupService);
  public squadreService = inject(SquadreService);

  public squadreLang: SquadreLang = {} as SquadreLang;
  public stampa = signal<boolean>(false);

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
      elseCall: () => {},
      nextCall: () => this.loadingService.hide(),
    });
  }

  captureElement() {
    this.chatService.chatVisibile.set(false);
    this.stampa.set(true);

    setTimeout(() => {
      window.print();
      this.stampa.set(false);
      this.chatService.chatVisibile.set(true);
    }, 50);
  }
}
