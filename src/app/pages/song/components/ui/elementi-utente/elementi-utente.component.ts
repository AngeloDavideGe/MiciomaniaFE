import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { handlerFunc } from '../../../../../../library/functions/handler.function';
import { DataHttp } from '../../../../../core/api/http.data';
import { UtenteParodie } from '../../../../../shared/interfaces/elementiUtente.interface';
import { User } from '../../../../../shared/interfaces/users.interface';
import { ElementiUtenteService } from '../../../../../shared/services/api/elementiUtente.service';
import { elementi_utente_imports } from './imports/elementi-utente.imports';

@Component({
  selector: 'app-elementi-utente',
  standalone: true,
  imports: elementi_utente_imports,
  templateUrl: './elementi-utente.component.html',
})
export class ElementiUtenteComponent implements OnInit {
  public router = inject(Router);
  public euService = inject(ElementiUtenteService);

  public eu = computed<UtenteParodie | null>(() =>
    this.euService.utenteParodie(),
  );

  public creaProposta = {
    componente: false,
    punteggio: false,
  };
  public userId: string = '';
  public userPunteggio: number = 0;
  public punteggioNecessario: number = 10;
  public tornaAllaHome: Function = () => this.router.navigate(['/home']);

  constructor() {
    effect(() => {
      const user: User | null = DataHttp.user();

      if (user) {
        this.userId = user.id;
        this.userPunteggio = user.iscrizione.punteggio || 0;
        this.creaProposta = {
          componente: false,
          punteggio: this.userPunteggio >= this.punteggioNecessario,
        };
      }
    });
  }

  ngOnInit(): void {
    const user: User | null = DataHttp.user();

    if (user) {
      this.userId = user.id;
      this.userPunteggio = user.iscrizione.punteggio || 0;

      handlerFunc<UtenteParodie>({
        skipCall: this.euService.utenteParodieLoaded,
        callHttp: () => this.euService.getElementiUtente(user.id),
        nextCall: (elementiUtente: UtenteParodie) => {
          this.creaProposta = {
            componente: false,
            punteggio: this.userPunteggio >= this.punteggioNecessario,
          };
          this.euService.utenteParodie.set(elementiUtente);
          this.euService.utenteParodieLoaded = true;
        },
        errorCall: () => (this.euService.utenteParodieLoaded = false),
      });

      this.euService.utenteParodieLoaded = true;
    }
  }
}
