import { Type } from '@angular/core';
import { ButtonCustomComponent } from '../../../../../../library/components/button/botton-custom.component';
import { Step1Component } from '../components/step1/step1.component';
import { Step2Component } from '../components/step2/step2.component';
import { Step3Component } from '../components/step3/step3.component';
import { TabsComponent } from '../../../../../../library/components/tabs/tabs.component';

export const iscrizione_imports: Type<any>[] = [
  Step1Component,
  Step2Component,
  Step3Component,
  ButtonCustomComponent,
  TabsComponent,
];
