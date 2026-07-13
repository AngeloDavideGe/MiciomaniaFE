import { Type } from '@angular/core';
import { ButtonIndyComponent } from '../../../../../library/components/button/button-indy.component';
import { MultiFormComponent } from '../../../../../library/components/multi-form/multi-form.component';
import { SpinnerIndyComponent } from '../../../../../library/components/spinner/spinner-indy.component';
import { TabsIndyComponent } from '../../../../../library/components/tabs/tabs-indy.component';
import { Step2Component } from './components/step2.component';

export const iscrizione_imports: Type<any>[] = [
  Step2Component,
  ButtonIndyComponent,
  TabsIndyComponent,
  MultiFormComponent,
  SpinnerIndyComponent,
];
