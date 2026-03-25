import { Type } from '@angular/core';
import { IconeListaComponent } from '../../../../../../../../shared/components/custom/icone-lista.component';
import { SpinnerComponent } from '../../../../../../../../shared/components/dialogs/spinner.component';
import { CardLetteraComponent } from '../components/card-lettera.component';

export const mn_imports: Type<any>[] = [
  CardLetteraComponent,
  IconeListaComponent,
  SpinnerComponent,
];
