import { Type } from '@angular/core';
import { CardCustomComponent } from '../../../../../../shared/components/custom/card-custom.component';
import { CustomNavBarComponent } from '../../../../../../shared/components/custom/navbar-custom.component';
import { SpinnerComponent } from '../../../../../../shared/components/dialogs/spinner.component';
import { CercaProfiliComponent } from '../components/cerca-profili/cerca-profili.component';
import { DescrizionePostComponent } from '../components/descrizione-post.component';
import { NoPostComponent } from '../components/no-post.component';

export const ultimiPost_import: Type<any>[] = [
  NoPostComponent,
  CustomNavBarComponent,
  CercaProfiliComponent,
  SpinnerComponent,
  CardCustomComponent,
  DescrizionePostComponent,
];
