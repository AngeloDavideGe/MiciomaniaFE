import { Type } from '@angular/core';
import { CardIndyComponent } from '../../../../../../library/components/card/card-indy.component';
import { CustomNavBarComponent } from '../../../../../shared/components/navbar/navbar.component';
import { SpinnerIndyComponent } from '../../../../../../library/components/spinner/spinner-indy.component';
import { ToggleIndyComponent } from '../../../../../../library/components/toggle/toggle-indy.component';
import { CercaProfiliComponent } from './components/cerca-profili/cerca-profili.component';
import { DescrizionePostComponent } from './components/descrizione-post.component';
import { NoPostComponent } from './components/no-post.component';
import { CheckBoxIndyComponent } from '../../../../../../library/components/checkbox/checkbox-indy.component';
import { ButtonIndyComponent } from '../../../../../../library/components/button/botton-indy.component';

export const ultimiPost_import: Type<any>[] = [
  NoPostComponent,
  CustomNavBarComponent,
  CercaProfiliComponent,
  SpinnerIndyComponent,
  CardIndyComponent,
  DescrizionePostComponent,
  ToggleIndyComponent,
  CheckBoxIndyComponent,
  ButtonIndyComponent,
];
