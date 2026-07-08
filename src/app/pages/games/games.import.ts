import { AsyncPipe } from '@angular/common';
import { Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardIndyComponent } from '../../../library/components/card/card-indy.component';
import { PunteggiGamesComponent } from './components/ui/punteggi-games.component';
import { CustomNavBarComponent } from '../../shared/components/navbar/navbar.component';

export const games_imports: Type<any>[] = [
  RouterOutlet,
  AsyncPipe,
  PunteggiGamesComponent,
  CardIndyComponent,
  CustomNavBarComponent,
];
