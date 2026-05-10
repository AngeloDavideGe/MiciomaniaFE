import { AsyncPipe } from '@angular/common';
import { Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardCustomComponent } from '../../../../library/components/card/card.component';
import { PunteggiGamesComponent } from '../components/ui/punteggi-games.component';
import { CustomNavBarComponent } from '../../../../library/components/navbar/navbar.component';

export const games_imports: Type<any>[] = [
  RouterOutlet,
  AsyncPipe,
  PunteggiGamesComponent,
  CardCustomComponent,
  CustomNavBarComponent,
];
