import { Type } from '@angular/core';
import { TabsIndyComponent } from '../../../../../library/components/tabs/tabs-indy.component';
import { ContaierMicioComponent } from '../../../../shared/components/container-micio.component';
import { DescrizioneMicioComponent } from '../../../../shared/components/descrizione-micio.component';
import { EditUserComponent } from './components/edit-user.component';
import { ModalIndyComponent } from '../../../../../library/components/modal/modal-indy.component';
import { DateFormatPipe } from '../../../../../library/pipes/date-format.pipe';

export const profilo_imports: Type<any>[] = [
  ContaierMicioComponent,
  DescrizioneMicioComponent,
  TabsIndyComponent,
  ModalIndyComponent,
  EditUserComponent,
  DateFormatPipe,
];
