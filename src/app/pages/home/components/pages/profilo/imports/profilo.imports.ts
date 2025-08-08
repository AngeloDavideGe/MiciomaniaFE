import { Type } from '@angular/core';
import { ErrorHttpComponent } from '../../../../../../shared/components/custom/errorhttp.component';
import { CardProfiloComponent } from '../components/card-profilo.component';
import { ChangePicComponent } from '../components/change-pic.component';
import { EditProfiloComponent } from '../components/edit-profilo/edit-profilo.component';
import { NewTweetComponent } from '../components/new-tweet/new-tweet.component';
import { SezioneTweetComponent } from '../components/sezione-tweet.component';
import { BottonCustomComponent } from '../../../../../../shared/components/custom/botton-custom.component';

export const profilo_imports: Type<any>[] = [
  NewTweetComponent,
  EditProfiloComponent,
  ChangePicComponent,
  ErrorHttpComponent,
  CardProfiloComponent,
  SezioneTweetComponent,
  BottonCustomComponent,
];
