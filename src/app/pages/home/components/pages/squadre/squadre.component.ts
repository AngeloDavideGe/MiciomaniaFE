import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
import { NavBarButton } from '../../../../../shared/components/custom/navbar-custom.component';
import { GitHubService } from '../../../../../shared/services/api/github.service';
import {
  Conquiste,
  MN,
} from '../../../../../shared/interfaces/github.interface';
import { take } from 'rxjs';
import { Classifica } from '../../../../../shared/interfaces/squadre.interface';

@Component({
  selector: 'app-squadre',
  standalone: true,
  imports: squadreimports,
  templateUrl: './squadre.component.html',
})
export class SquadreComponent implements OnInit {
  private chatService = inject(ChatService);
  public githubService = inject(GitHubService);
  public squadreService = inject(SquadreService);

  public squadreLang: SquadreLang = {} as SquadreLang;
  public bottoniNavbar: NavBarButton[] = this.loadButton();
  public component = signal<'Squadre' | 'print' | 'Mappa' | 'M-N'>('Squadre');
  public error = signal<boolean>(false);

  public classifica = computed<Classifica>(() =>
    this.squadreService.classifica(),
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
    this.loadSquadre();
    this.loadMappa();
    this.loadMN();
  }

  captureElement(): void {
    this.chatService.chatVisibile.set(false);
    this.component.set('print');

    setTimeout(() => {
      window.print();
      this.component.set('Squadre');
      this.chatService.chatVisibile.set(true);
    }, 50);
  }

  private loadSquadre(): void {
    loadSquadre({
      squadreService: this.squadreService,
      nextCall: (data: Classifica) => this.squadreService.classifica.set(data),
      errorCall: () => this.error.set(true),
    });
  }

  private loadMappa(): void {
    if (!this.githubService.conquiste()) {
      this.githubService
        .getGistFormGithub(
          'AngeloDavideGe',
          '6a1e0e41b352f6e2d8339d9e1d7133ae',
          'Conquiste.json',
        )
        .pipe(take(1))
        .subscribe({
          next: (data) => this.githubService.conquiste.set(data as Conquiste),
          error: (err) => console.error('errore nel recupero mappa', err),
        });
    }
  }

  private loadMN(): void {
    if (this.githubService.mn().length == 0) {
      this.githubService
        .getGistFormGithub(
          'AngeloDavideGe',
          '797ad9d22d6c2401fcaabfda1c6d870f',
          'MeN.json',
        )
        .pipe(take(1))
        .subscribe({
          next: (gist) => this.githubService.mn.set(gist as MN[]),
          error: (error) => console.error('Error fetching M&N data:', error),
        });
    }
  }

  private loadButton(): NavBarButton[] {
    return [
      {
        icon: 'bi bi-bar-chart-line',
        title: 'Squadre',
        action: () => this.component.set('Squadre'),
      },
      {
        icon: 'bi bi-map',
        title: 'Mappa',
        action: () => this.component.set('Mappa'),
      },
      {
        icon: 'bi bi-map',
        title: 'M-N',
        action: () => this.component.set('M-N'),
      },
    ];
  }
}
