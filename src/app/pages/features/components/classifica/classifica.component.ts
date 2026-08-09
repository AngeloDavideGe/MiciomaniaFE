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
  getClassificaTabs,
  getColonneTabellaGiocatori,
  getColonneTabellaSquadre,
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

  public readonly tabs = getClassificaTabs();
  public readonly colonneGiocatori = getColonneTabellaGiocatori();
  public readonly colonneSquadre = getColonneTabellaSquadre();

  public currentTab = signal<string>('giocatori');
  public spinner = computed<boolean>(() => !this.opereService.classifica());

  public giocatori = computed<Giocatore[]>(
    () => this.opereService.classifica()?.giocatori || [],
  );

  public squadre = computed<Squadra[]>(
    () => this.opereService.classifica()?.squadre || [],
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
}
