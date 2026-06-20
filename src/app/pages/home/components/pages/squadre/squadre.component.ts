import {
  AfterViewInit,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { handlerFunc } from '../../../../../../library/functions/handler.function';
import { NavBarButton } from '../../../../../../library/interfaces/navbar.interface';
import { PathSvgCustom } from '../../../../../../library/interfaces/svg.interface';
import { ChatService } from '../../../../../core/components/chat/services/chat.service';
import {
  Conquiste,
  GitHubType,
} from '../../../../../shared/interfaces/github.interface';
import {
  Classifica,
  MN,
} from '../../../../../shared/interfaces/squadre.interface';
import { MNService } from '../../../../../shared/services/api/mn.service';
import { SquadreService } from '../../../../../shared/services/api/squadre.service';
import { PATH_MUSCOLI } from './constants/path-muscoli.constant';
import { PATH_REGIONI } from './constants/path-regioni.constant';
import { squadre_imports } from './squadre.import';

type componentType = 'Squadre' | 'print' | 'Mappa' | 'Muscoli' | 'M-N';

@Component({
  selector: 'app-squadre',
  standalone: true,
  imports: squadre_imports,
  templateUrl: './squadre.component.html',
})
export class SquadreComponent implements OnInit, AfterViewInit {
  private chatService = inject(ChatService);
  public squadreService = inject(SquadreService);
  public mnService = inject(MNService);

  public bottoniNavbar: NavBarButton[] = this.loadButton();
  public component = signal<componentType>('Squadre');
  public pathRecord: Record<string, PathSvgCustom[]> = {};

  public classifica = computed<Classifica>(() =>
    this.squadreService.classifica(),
  );

  ngOnInit(): void {
    this.loadSquadre();
    this.loadMappa();
    this.loadMN();
  }

  ngAfterViewInit(): void {
    this.pathRecord = {
      regioni: PATH_REGIONI,
      muscoli: PATH_MUSCOLI,
    };
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
    handlerFunc<Classifica>({
      skipCall: this.squadreService.classificaLoaded,
      callHttp: () => this.squadreService.getClassifica(),
      nextCall: (data: Classifica) => this.squadreService.classifica.set(data),
      errorCall: () => (this.squadreService.classificaLoaded = false),
    });

    this.squadreService.classificaLoaded = true;
  }

  private loadMappa(): void {
    handlerFunc<GitHubType>({
      skipCall: this.mnService.conquisteLoaded,
      callHttp: () => this.mnService.getTerritoriConquistati(),
      nextCall: (data: GitHubType) =>
        this.mnService.conquiste.set(data as Conquiste),
      errorCall: () => (this.mnService.conquisteLoaded = false),
    });

    this.mnService.conquisteLoaded = true;
  }

  private loadMN(): void {
    handlerFunc<MN[]>({
      skipCall: this.mnService.mnLoaded,
      callHttp: () => this.mnService.getMN(),
      nextCall: (data: MN[]) => this.mnService.mn.set(data),
      errorCall: () => (this.mnService.mnLoaded = false),
    });

    this.mnService.mnLoaded = true;
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
        icon: 'bi bi-person-standing',
        title: 'Muscoli',
        action: () => this.component.set('Muscoli'),
      },
      {
        icon: 'bi bi-pen',
        title: 'M-N',
        action: () => this.component.set('M-N'),
      },
    ];
  }
}
