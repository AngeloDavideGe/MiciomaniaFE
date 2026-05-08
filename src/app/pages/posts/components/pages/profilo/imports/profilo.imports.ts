import { Type } from '@angular/core';
import { ChangePicCustomComponent } from '../../../../../../shared/components/custom/change-pic-custom.component';
import { ErrorHttpComponent } from '../../../../../../shared/components/custom/errorhttp.component';
import { CustomNavBarComponent } from '../../../../../../../library/components/navbar/navbar.component';
import { CardProfiloComponent } from '../components/card-profilo.component';
import { EditProfiloComponent } from '../components/edit-profilo/edit-profilo.component';
import { NewTweetComponent } from '../components/new-tweet/new-tweet.component';
import { SezioneTweetComponent } from '../components/sezione-tweet.component';
import { SpinnerComponent } from '../../../../../../../library/components/spinner/spinner.component';

export const profilo_imports: Type<any>[] = [
  NewTweetComponent,
  EditProfiloComponent,
  ChangePicCustomComponent,
  ErrorHttpComponent,
  CardProfiloComponent,
  SezioneTweetComponent,
  CustomNavBarComponent,
  SpinnerComponent,
];
