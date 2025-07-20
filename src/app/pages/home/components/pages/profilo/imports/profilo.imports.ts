import { ErrorHttpComponent } from '../../../../../../shared/components/errorhttp.component';
import { CardProfiloComponent } from '../components/card-profilo.component';
import { ChangePicComponent } from '../components/change-pic.component';
import { EditProfiloComponent } from '../components/edit-profilo/edit-profilo.component';
import { NewTweetComponent } from '../components/new-tweet/new-tweet.component';
import { SezioneTweetComponent } from '../components/sezione-tweet.component';

export const profilo_imports = [
  NewTweetComponent,
  EditProfiloComponent,
  ChangePicComponent,
  ErrorHttpComponent,
  CardProfiloComponent,
  SezioneTweetComponent,
];
