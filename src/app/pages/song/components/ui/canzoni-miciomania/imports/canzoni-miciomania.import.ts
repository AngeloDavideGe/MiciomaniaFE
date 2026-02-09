import { Type } from '@angular/core';
import { CustomScrollComponent } from '../../../../../../shared/components/custom/scroll-custom.component';
import { PaginazioneCustomComponent } from '../../../../../../shared/components/custom/pagination.component';
import { SpinnerComponent } from '../../../../../../shared/components/dialogs/spinner.component';
import { CardCustomComponent } from '../../../../../../shared/components/custom/card-custom.component';

export const canzoniMiciomania_imports: Type<any>[] = [
  CustomScrollComponent,
  SpinnerComponent,
  CardCustomComponent,
  PaginazioneCustomComponent,
];
