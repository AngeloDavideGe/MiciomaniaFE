import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PunteggiGamesComponent } from '../components/ui/dettagli-games.component';
import { ListaGamesComponent } from '../components/ui/lista-games.component';
import { PresentazioneGamesComponent } from '../components/ui/presentazione-games.component';
import { Type } from '@angular/core';

export const games_imports: Type<any>[] = [
  RouterOutlet,
  AsyncPipe,
  PresentazioneGamesComponent,
  PunteggiGamesComponent,
  ListaGamesComponent,
];
