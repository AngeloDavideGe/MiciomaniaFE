import { Type } from '@angular/core';
import { HeaderCustomComponent } from '../../../shared/components/custom/header-custom.component';
import { CustomScrollComponent } from '../../../shared/components/custom/scroll-custom.component';
import { CardSongComponent } from '../components/card-song.component';

export const song_imports: Type<any>[] = [
  HeaderCustomComponent,
  CardSongComponent,
  CustomScrollComponent,
  HeaderCustomComponent,
];
