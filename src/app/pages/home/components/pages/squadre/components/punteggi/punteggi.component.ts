import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { RecordColonne } from '../../../../../../../shared/components/custom/tabella-custom.component';
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
      <div class="rounded-3">
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
          <div class="container">
            <div class="grid-card-layout" style="--card-width: 30rem; ">
              <app-table-custom
                [elemTable]="giocatori"
                [colonne]="colonneUtenti"
                [titoloTabella]="'Punteggio Utenti'"
                [elemForPage]="elemForPage.utenti"
              ></app-table-custom>

              <app-table-custom
                [elemTable]="squadre"
                [colonne]="colonneSquadre"
                [titoloTabella]="'Punteggio Squadre'"
                [elemForPage]="elemForPage.squadre"
              ></app-table-custom>
            </div>
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

  public elemForPage = {
    utenti: signal<number>(5),
    squadre: signal<number>(5),
  };

  @Input() squadreLang!: SquadreLang;
  @Output() captureElement = new EventEmitter<void>();

  @Input() set setClassifica(classific: Classifica) {
    this.classifica.set(classific);

    if (classific.squadre.length > 0) {
      this.giocatori.set(classific.giocatori);
      this.squadre.set(classific.squadre);
    }
  }

  public readonly colonneSquadre: Partial<RecordColonne<Squadre>> = {
    nome: {
      titolo: 'Nome',
      lunghezza: '15rem',
      sortCol: true,
    },
    punteggio: {
      titolo: 'Punteggio',
      lunghezza: '15rem',
      sortCol: true,
    },
  };

  public readonly colonneUtenti: RecordColonne<Giocatori> = {
    idUtente: {
      titolo: 'Nome',
      lunghezza: '10rem',
      sortCol: true,
    },
    punteggio: {
      titolo: 'Punteggio',
      lunghezza: '10rem',
      sortCol: true,
    },
    squadra: {
      titolo: 'Squadra',
      lunghezza: '10rem',
      sortCol: true,
    },
  };
}
