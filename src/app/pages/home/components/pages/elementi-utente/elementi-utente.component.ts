import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { DataHttp } from '../../../../../core/api/http.data';
import {
  MangaSong,
  UtenteParodie,
} from '../../../../../shared/interfaces/elementiUtente.interface';
import { Lingua } from '../../../../../shared/interfaces/http.interface';
import { User } from '../../../../../shared/interfaces/users.interface';
import { ElementiUtenteUtilities } from '../../../../../shared/utilities/elementiUtente.utilities';
import { elementi_utente_imports } from './imports/elementi-utente.imports';
import {
  ElemLang,
  ElemLangType,
} from './languages/interfaces/elem-lang.interface';

@Component({
  selector: 'app-elementi-utente',
  standalone: true,
  imports: elementi_utente_imports,
  templateUrl: './elementi-utente.component.html',
})
export class ElementiUtenteComponent implements OnInit {
  public router = inject(Router);

  public eu: UtenteParodie = {
    mangaUtente: {} as MangaSong,
    canzoniUtente: {} as MangaSong,
  };
  public creaProposta = {
    componente: false,
    punteggio: false,
  };
  public userId: string = '';
  public userPunteggio: number = 0;
  public punteggioNecessario: number = 10;
  public tornaAllaHome: Function = () => this.router.navigate(['/home']);
  public elemUti = new ElementiUtenteUtilities();
  public elemLang: ElemLang = {} as ElemLang;

  constructor() {
    const lingua: Lingua = DataHttp.lingua();
    const languageMap: Record<Lingua, () => Promise<ElemLangType>> = {
      it: () => import('./languages/constants/elem-it.constant'),
      en: () => import('./languages/constants/elem-en.constant'),
    };
    languageMap[lingua]().then((m) => (this.elemLang = m.elemLang));
  }

  ngOnInit(): void {
    this.loadElementiUtente();
    this.controlloProposta();
  }

  private loadElementiUtente(): void {
    const user: User | null = DataHttp.user();

    if (user) {
      this.userId = user.id;
      this.userPunteggio = user.iscrizione.punteggio || 0;
      this.elemUti
        .getElementiUtente(user.id)
        .pipe(take(1))
        .subscribe({
          next: (elementiUtente: UtenteParodie) => {
            this.eu = elementiUtente;
            this.creaProposta = {
              componente: false,
              punteggio: this.userPunteggio >= this.punteggioNecessario,
            };
          },
          error: (error) =>
            console.error('Errore nel recupero degli elementi utente:', error),
        });
    }
  }

  private controlloProposta(): void {
    if (!this.elemUti.elementiUtenteService.propostaCaricata) {
      this.router.navigate(['/home']);
      alert('La proposta sta in caricamento, attendere un attimo');
    }
  }
}
