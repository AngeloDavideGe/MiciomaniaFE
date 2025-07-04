import { CommonModule } from '@angular/common';
import { ErrorIscrizioneComponent } from '../components/error/error-iscrizione.component';
import { Step1Component } from '../components/step1/step1.component';
import { Step2Component } from '../components/step2/step2.component';
import { Step3Component } from '../components/step3/step3.component';
import { SuccessPageComponent } from '../components/success/success.component';

export const iscrizione_imports = [
  CommonModule,
  Step1Component,
  Step2Component,
  Step3Component,
  ErrorIscrizioneComponent,
  SuccessPageComponent,
];
