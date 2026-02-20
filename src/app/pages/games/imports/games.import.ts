import { AsyncPipe } from '@angular/common';
import { Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardCustomComponent } from '../../../shared/components/custom/card-custom.component';
import { HeaderCustomComponent } from '../../../shared/components/custom/header-custom.component';
import { PunteggiGamesComponent } from '../components/ui/punteggi-games.component';

export const games_imports: Type<any>[] = [
  RouterOutlet,
  AsyncPipe,
  PunteggiGamesComponent,
  HeaderCustomComponent,
  CardCustomComponent,
];
