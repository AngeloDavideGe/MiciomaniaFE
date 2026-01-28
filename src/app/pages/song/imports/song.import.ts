import { Type } from '@angular/core';
import { CustomScrollComponent } from '../../../shared/components/custom/scroll-custom.component';
import { CardSongComponent } from '../components/card-song.component';
import { CustomNavBarComponent } from '../../../shared/components/custom/navbar-custom.component';
import { ElementiUtenteComponent } from '../components/elementi-utente/elementi-utente.component';

export const song_imports: Type<any>[] = [
  CardSongComponent,
  CustomScrollComponent,
  CustomNavBarComponent,
  ElementiUtenteComponent,
];
