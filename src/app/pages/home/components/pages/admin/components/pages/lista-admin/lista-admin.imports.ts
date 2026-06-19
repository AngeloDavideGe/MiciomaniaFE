import { Type } from '@angular/core';
import { FormCustomComponent } from '../../../../../../../../../library/components/form/form.component';
import { ModalCustomComponent } from '../../../../../../../../../library/components/modal/modal.component';
import { SpinnerComponent } from '../../../../../../../../../library/components/spinner/spinner.component';
import { TabellaCustomComponent } from '../../../../../../../../../library/components/table/table.component';
import { TabsComponent } from '../../../../../../../../../library/components/tabs/tabs.component';

export const listaAdmin_imports: Type<any>[] = [
  TabellaCustomComponent,
  TabsComponent,
  SpinnerComponent,
  ModalCustomComponent,
  FormCustomComponent,
];
