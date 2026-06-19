import { Type } from '@angular/core';
import { ButtonCustomComponent } from '../../../../../library/components/button/botton-custom.component';
import { MultiFormComponent } from '../../../../../library/components/multi-form/multi-form.component';
import { SpinnerComponent } from '../../../../../library/components/spinner/spinner.component';
import { TabsComponent } from '../../../../../library/components/tabs/tabs.component';
import { Step2Component } from './components/step2.component';

export const iscrizione_imports: Type<any>[] = [
  Step2Component,
  ButtonCustomComponent,
  TabsComponent,
  MultiFormComponent,
  SpinnerComponent,
];
