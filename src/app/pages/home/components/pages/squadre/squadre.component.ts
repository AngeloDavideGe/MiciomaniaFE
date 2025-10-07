import { Component, inject, OnInit, signal } from '@angular/core';
import { DataHttp } from '../../../../../core/api/http.data';
import { ChatService } from '../../../../../core/components/chat/services/chat.service';
import { loadSquadre } from '../../../../../shared/handlers/squadre.handler';
import { Lingua } from '../../../../../shared/interfaces/http.interface';
import { SquadreService } from '../../../../../shared/services/api/squadre.service';
import { LoadingService } from '../../../../../shared/services/template/loading.service';
import { squadreimports } from './imports/squadre.import';
import {
  SquadreLang,
  SquadreLangType,
} from './languages/interfaces/squadre-lang.interface';

@Component({
  selector: 'app-squadre',
  standalone: true,
  imports: squadreimports,
  templateUrl: './squadre.component.html',
})
export class SquadreComponent implements OnInit {
  private loadingService = inject(LoadingService);
  private chatService = inject(ChatService);
  public squadreService = inject(SquadreService);

  public squadreLang: SquadreLang = {} as SquadreLang;
  public stampa = signal<boolean>(false);
  public error = signal<boolean>(false);

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
      nextCall: () => {},
      errorCall: () => this.error.set(true),
      finalizeFunc: () => this.loadingService.hide(),
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
