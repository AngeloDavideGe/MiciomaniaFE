import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PunteggiGamesComponent } from '../components/ui/dettagli-games.component';
import { ListaGamesComponent } from '../components/ui/lista-games.component';
import { Type } from '@angular/core';
import { HeaderCustomComponent } from '../../../shared/components/custom/header-custom.component';

export const games_imports: Type<any>[] = [
  RouterOutlet,
  AsyncPipe,
  PunteggiGamesComponent,
  ListaGamesComponent,
  HeaderCustomComponent,
];
