import { Type } from '@angular/core';
import { ChangePicCustomComponent } from '../../../../../../shared/components/custom/change-pic-custom.component';
import { ErrorHttpComponent } from '../../../../../../shared/components/custom/errorhttp.component';
import { CustomNavBarComponent } from '../../../../../../../library/components/navbar/navbar.component';
import { CardProfiloComponent } from '../components/card-profilo.component';
import { SezioneTweetComponent } from '../components/sezione-tweet.component';
import { SpinnerComponent } from '../../../../../../../library/components/spinner/spinner.component';
import { ModalCustomComponent } from '../../../../../../../library/components/modal/modal.component';
import { TabsComponent } from '../../../../../../../library/components/tabs/tabs.component';
import { TabInfoComponent } from '../components/tab-info.component';
import { TabSocialComponent } from '../components/tab-social.component';
import { FormCustomComponent } from '../../../../../../../library/components/form/form.component';

export const profilo_imports: Type<any>[] = [
  ChangePicCustomComponent,
  ErrorHttpComponent,
  CardProfiloComponent,
  SezioneTweetComponent,
  CustomNavBarComponent,
  SpinnerComponent,
  ModalCustomComponent,
  TabsComponent,
  TabInfoComponent,
  TabSocialComponent,
  FormCustomComponent,
];
