import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { handlerFunc } from '../../../../../library/functions/handler.function';
import {
  Mappa,
  PathSvgCustom,
} from '../../../../../library/interfaces/svg.interface';
import { AppConfigService } from '../../../../core/api/appConfig.service';
import {
  Classifica,
  Giocatore,
  Squadra,
} from '../../../../shared/interfaces/opere.interface';
import { OpereService } from '../../../../shared/services/opere.service';
import { classifica_imports } from './classifica.imports';
import {
  computedPathsClassifica,
  computedTabellaClassifica,
} from './functions/classifica.computed';
import {
  getBadgeTable,
  getClassificaTabs,
  getColonneTabellaGiocatori,
  getColonneTabellaSquadre,
  getVisualizzaTabs,
} from './functions/classifica.functions';

@Component({
  selector: 'app-classifica',
  standalone: true,
  imports: classifica_imports,
  templateUrl: './classifica.component.html',
  styleUrl: './classifica.component.scss',
})
export class ClassificaComponent implements OnInit {
  private opereService = inject(OpereService);
  private appConfig = inject(AppConfigService);

  public readonly lang = this.appConfig.lang.Classifica;
  public readonly tabs = getClassificaTabs(this.lang.Tabs);
  public readonly viewTabs = getVisualizzaTabs(this.lang.Tabs);
  public readonly colonneGiocatori = getColonneTabellaGiocatori(
    this.lang.Colonne,
  );
  public readonly colonneSquadre = getColonneTabellaSquadre(this.lang.Colonne);
  public readonly badgeTable = getBadgeTable();

  public currentTab = signal<string>('giocatori');
  public viewTab = signal<string>('tabella');
  public modaleClassifica = signal<Mappa | null>(null);
  public spinner = computed<boolean>(() => !this.opereService.classifica());

  public giocatori = computed<Giocatore[]>(
    () =>
      computedTabellaClassifica(
        'giocatori',
        this.opereService.classifica(),
      ) as Giocatore[],
  );

  public squadre = computed<Squadra[]>(
    () =>
      computedTabellaClassifica(
        'squadre',
        this.opereService.classifica(),
      ) as Squadra[],
  );

  public pathGiocatori = computed<PathSvgCustom[]>(() =>
    computedPathsClassifica('giocatori', this.opereService.classifica()),
  );

  public pathSquadre = computed<PathSvgCustom[]>(() =>
    computedPathsClassifica(
      'squadre',
      this.opereService.classifica(),
      (item: Squadra) =>
        this.modaleClassifica.set({
          proprietario: (item as Squadra).nome,
          descrizione: (item as Squadra).descrizione,
        }),
    ),
  );

  public graficoAltezzaGiocatori = computed<number>(() =>
    Math.max(180, this.pathGiocatori().length * 56 + 26),
  );

  public graficoAltezzaSquadre = computed<number>(() =>
    Math.max(180, this.pathSquadre().length * 56 + 26),
  );

  ngOnInit(): void {
    handlerFunc<Classifica>({
      skipCall: this.opereService.classificaLoaded,
      callHttp: () => this.opereService.getClassifica(),
      nextCall: (data: Classifica) => this.opereService.classifica.set(data),
      errorCall: () => (this.opereService.classificaLoaded = false),
    });

    this.opereService.classificaLoaded = true;
  }
}
