import { Type } from '@angular/core';
import { HeaderCustomComponent } from '../../../../../../shared/components/custom/header-custom.component';
import { CustomScrollComponent } from '../../../../../../shared/components/custom/scroll-custom.component';
import { SpinnerComponent } from '../../../../../../shared/components/dialogs/spinner.component';
import { CardMangaMiciomaniaComponent } from '../components/card-mangaMiciomania.component';

export const mangaMiciomania_imports: Type<any>[] = [
  HeaderCustomComponent,
  CardMangaMiciomaniaComponent,
  CustomScrollComponent,
  SpinnerComponent,
];
