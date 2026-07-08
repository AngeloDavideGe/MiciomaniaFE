import { Type } from '@angular/core';
import { FormIndyComponent } from '../../../../../../library/components/form/form-indy.component';
import { ModalIndyComponent } from '../../../../../../library/components/modal/modal-indy.component';
import { CustomNavBarComponent } from '../../../../../shared/components/navbar/navbar.component';
import { SpinnerIndyComponent } from '../../../../../../library/components/spinner/spinner-indy.component';
import { CardProfiloComponent } from './components/card-profilo.component';
import { SezioneTweetComponent } from './components/sezione-tweet.component';

export const profilo_imports: Type<any>[] = [
  CardProfiloComponent,
  SezioneTweetComponent,
  CustomNavBarComponent,
  SpinnerIndyComponent,
  ModalIndyComponent,
  FormIndyComponent,
];
