import { Type } from '@angular/core';
import { CustomNavBarComponent } from '../../../../../library/components/navbar/navbar.component';
import { CanzoniMiciomaniaComponent } from '../ui/canzoni-miciomania/canzoni-miciomania.component';
import { ElementiUtenteComponent } from '../ui/elementi-utente/elementi-utente.component';

export const song_imports: Type<any>[] = [
  CustomNavBarComponent,
  ElementiUtenteComponent,
  CanzoniMiciomaniaComponent,
];
