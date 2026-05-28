import { Type } from '@angular/core';
import { FormCustomComponent } from '../../../../../../../library/components/form/form.component';
import { ModalCustomComponent } from '../../../../../../../library/components/modal/modal.component';
import { CustomNavBarComponent } from '../../../../../../../library/components/navbar/navbar.component';
import { SpinnerComponent } from '../../../../../../../library/components/spinner/spinner.component';
import { TabsComponent } from '../../../../../../../library/components/tabs/tabs.component';
import { CardProfiloComponent } from '../components/card-profilo.component';
import { SezioneTweetComponent } from '../components/sezione-tweet.component';
import { TabInfoComponent } from '../components/tab-info.component';
import { TabSocialComponent } from '../components/tab-social.component';

export const profilo_imports: Type<any>[] = [
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
