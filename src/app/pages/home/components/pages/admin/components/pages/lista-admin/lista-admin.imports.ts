import { Type } from '@angular/core';
import { FormIndyComponent } from '../../../../../../../../../library/components/form/form-indy.component';
import { ModalIndyComponent } from '../../../../../../../../../library/components/modal/modal-indy.component';
import { SpinnerIndyComponent } from '../../../../../../../../../library/components/spinner/spinner-indy.component';
import { TabellaIndyComponent } from '../../../../../../../../../library/components/table/table-indy.component';
import { TabsIndyComponent } from '../../../../../../../../../library/components/tabs/tabs-indy.component';

export const listaAdmin_imports: Type<any>[] = [
  TabellaIndyComponent,
  TabsIndyComponent,
  SpinnerIndyComponent,
  ModalIndyComponent,
  FormIndyComponent,
];
