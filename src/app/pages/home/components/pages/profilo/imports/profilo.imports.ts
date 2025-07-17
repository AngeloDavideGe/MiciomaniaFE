import { DatePipe, NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import { ErrorHttpComponent } from '../../../../../../shared/components/errorhttp.component';
import { ChangePicComponent } from '../components/change-pic/change-pic.component';
import { EditProfiloComponent } from '../components/edit-profilo/edit-profilo.component';
import { NewTweetComponent } from '../components/new-tweet/new-tweet.component';

export const profilo_imports = [
  NgTemplateOutlet,
  DatePipe,
  NewTweetComponent,
  EditProfiloComponent,
  ChangePicComponent,
  TitleCasePipe,
  ErrorHttpComponent,
];
