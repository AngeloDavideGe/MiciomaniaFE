import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { OpereService } from '../../../../shared/services/opere.service';
import { classifica_imports } from './classifica.imports';
import {
  Classifica,
  Giocatore,
  Squadra,
} from '../../../../shared/interfaces/opere.interface';
import { handlerFunc } from '../../../../../library/functions/handler.function';
import {
  getBadgeTable,
  getClassificaTabs,
  getColonneTabellaGiocatori,
  getColonneTabellaSquadre,
} from './functions/classifica.functions';
import { GetOrderCustom } from '../../../../../library/functions/ordinamento.function';

@Component({
  selector: 'app-classifica',
  standalone: true,
  imports: classifica_imports,
  templateUrl: './classifica.component.html',
  styleUrl: './classifica.component.scss',
})
export class ClassificaComponent implements OnInit {
  private opereService = inject(OpereService);

  public readonly tabs = getClassificaTabs();
  public readonly colonneGiocatori = getColonneTabellaGiocatori();
  public readonly colonneSquadre = getColonneTabellaSquadre();
  public readonly badgeTable = getBadgeTable();

  public currentTab = signal<string>('giocatori');
  public spinner = computed<boolean>(() => !this.opereService.classifica());

  public giocatori = computed<Giocatore[]>(
    () => this.computedClassifica('giocatori') as Giocatore[],
  );

  public squadre = computed<Squadra[]>(
    () => this.computedClassifica('squadre') as Squadra[],
  );

  constructor() {}

  ngOnInit(): void {
    handlerFunc<Classifica>({
      skipCall: this.opereService.classificaLoaded,
      callHttp: () => this.opereService.getClassifica(),
      nextCall: (data: Classifica) => this.opereService.classifica.set(data),
      errorCall: () => (this.opereService.classificaLoaded = false),
    });

    this.opereService.classificaLoaded = true;
  }

  private computedClassifica(key: keyof Classifica): (Giocatore | Squadra)[] {
    const classifica: Classifica | null = this.opereService.classifica();

    if (!classifica) {
      return [];
    }

    const items: (Giocatore | Squadra)[] = classifica[key];

    if (items.length === 0) {
      return [];
    }

    return GetOrderCustom<Giocatore | Squadra>(items, 'punteggio', false).map(
      (item: Giocatore | Squadra, index: number) => ({
        ...item,
        posizione: index + 1,
      }),
    );
  }
}
