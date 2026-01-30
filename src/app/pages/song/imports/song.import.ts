import { Type } from '@angular/core';
import { CustomNavBarComponent } from '../../../shared/components/custom/navbar-custom.component';
import { CanzoniMiciomaniaComponent } from '../components/ui/canzoni-miciomania/canzoni-miciomania.component';
import { ElementiUtenteComponent } from '../components/ui/elementi-utente/elementi-utente.component';

export const song_imports: Type<any>[] = [
  CustomNavBarComponent,
  ElementiUtenteComponent,
  CanzoniMiciomaniaComponent,
];
