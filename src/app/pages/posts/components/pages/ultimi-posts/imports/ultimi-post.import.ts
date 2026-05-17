import { Type } from '@angular/core';
import { CardCustomComponent } from '../../../../../../../library/components/card/card.component';
import { CustomNavBarComponent } from '../../../../../../../library/components/navbar/navbar.component';
import { SpinnerComponent } from '../../../../../../../library/components/spinner/spinner.component';
import { CercaProfiliComponent } from '../components/cerca-profili/cerca-profili.component';
import { DescrizionePostComponent } from '../components/descrizione-post.component';
import { NoPostComponent } from '../components/no-post.component';
import { FiltriPostComponent } from '../components/filtri-post.component';

export const ultimiPost_import: Type<any>[] = [
  NoPostComponent,
  CustomNavBarComponent,
  CercaProfiliComponent,
  SpinnerComponent,
  CardCustomComponent,
  DescrizionePostComponent,
  FiltriPostComponent,
];
