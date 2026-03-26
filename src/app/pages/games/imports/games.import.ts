import { AsyncPipe } from '@angular/common';
import { Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardCustomComponent } from '../../../shared/components/custom/card-custom.component';
import { PunteggiGamesComponent } from '../components/ui/punteggi-games.component';
import { CustomNavBarComponent } from '../../../shared/components/custom/navbar-custom.component';

export const games_imports: Type<any>[] = [
  RouterOutlet,
  AsyncPipe,
  PunteggiGamesComponent,
  CardCustomComponent,
  CustomNavBarComponent,
];
