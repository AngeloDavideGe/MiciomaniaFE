import { Type } from '@angular/core';
import { CustomNavBarComponent } from '../../../../shared/components/custom/navbar-custom.component';
import { CanzoniMiciomaniaComponent } from '../ui/canzoni-miciomania/canzoni-miciomania.component';
import { ElementiUtenteComponent } from '../ui/elementi-utente/elementi-utente.component';
import { CardCustomComponent } from '../../../../shared/components/custom/card-custom.component';

export const song_imports: Type<any>[] = [
  CustomNavBarComponent,
  ElementiUtenteComponent,
  CanzoniMiciomaniaComponent,
  CardCustomComponent,
];
