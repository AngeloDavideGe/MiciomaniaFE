import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ColonnaCustom } from '../../../../../../../shared/components/custom/tabella-custom.component';
import {
  Classifica,
  Giocatori,
  Squadre,
} from '../../../../../../../shared/interfaces/squadre.interface';
import { SquadreLang } from '../../languages/interfaces/squadre-lang.interface';
import { punteggi_imports } from './imports/punteggi.import';

@Component({
  selector: 'app-punteggi-component',
  imports: punteggi_imports,
  template: `
    @if (classifica().squadre.length > 0) {
      <div class="mt-5 p-4 rounded-3">
        <app-lista-squadre
          [squadreLang]="squadreLang"
          [classifica]="classifica()"
        ></app-lista-squadre>

        <app-icone-lista
          [classNG]="classNg()"
          [ngClass1]="'chart'"
          [ngClass2]="'table'"
          (classNGChange)="classNg.set($event)"
        ></app-icone-lista>

        @if (classNg() == 'chart') {
          <app-chart-custom [classifica]="classifica()"></app-chart-custom>
        } @else {
          <div class="grid-card-layout" style="--card-width: 30rem;">
            <app-table-custom
              [elemTable]="giocatori"
              [keyofElem]="['idUtente', 'punteggio', 'squadra']"
              [colonne]="colonneUtenti"
              [titoloTabella]="'Punteggio Utenti'"
              [elemForPage]="5"
            ></app-table-custom>

            <app-table-custom
              [elemTable]="squadre"
              [keyofElem]="['nome', 'punteggio']"
              [colonne]="colonneSquadre"
              [titoloTabella]="'Punteggio Squadre'"
              [elemForPage]="5"
            ></app-table-custom>
          </div>
        }

        <app-bottoni-squadre
          (captureElement)="captureElement.emit()"
        ></app-bottoni-squadre>
      </div>
    } @else {
      <app-spinner [mt]="'10rem'"></app-spinner>
    }
  `,
})
export class PunteggiComponent {
  public classNg = signal<string>('chart');
  public giocatori = signal<Giocatori[]>([]);
  public squadre = signal<Squadre[]>([]);
  public classifica = signal<Classifica>({} as Classifica);

  @Input() squadreLang!: SquadreLang;
  @Output() captureElement = new EventEmitter<void>();

  @Input() set setClassifica(classific: Classifica) {
    this.classifica.set(classific);

    if (classific.squadre.length > 0) {
      this.giocatori.set(classific.giocatori);
      this.squadre.set(classific.squadre);
    }
  }

  public colonneSquadre: Record<keyof Squadre, ColonnaCustom> = {
    nome: {
      titolo: 'Nome',
      lunghezza: '15rem',
    },
    punteggio: {
      titolo: 'Punteggio',
      lunghezza: '15rem',
    },
    descrizione: {} as ColonnaCustom,
    colore: {} as ColonnaCustom,
  };

  public colonneUtenti: Record<keyof Giocatori, ColonnaCustom> = {
    idUtente: {
      titolo: 'Nome',
      lunghezza: '10rem',
    },
    punteggio: {
      titolo: 'Punteggio',
      lunghezza: '10rem',
    },
    squadra: {
      titolo: 'Squadra',
      lunghezza: '10rem',
    },
  };
}
