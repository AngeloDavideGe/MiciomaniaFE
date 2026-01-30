import { NgClass } from '@angular/common';
import { Type } from '@angular/core';
import { CustomNavBarComponent } from '../../../../../../shared/components/custom/navbar-custom.component';
import { CardPostComponent } from '../components/card-post.component';
import { CercaProfiliComponent } from '../components/cerca-profili/cerca-profili.component';
import { NoPostComponent } from '../components/no-post.component';
import { SpinnerComponent } from '../../../../../../shared/components/dialogs/spinner.component';

export const ultimiPost_import: Type<any>[] = [
  CardPostComponent,
  NoPostComponent,
  CustomNavBarComponent,
  CercaProfiliComponent,
  NgClass,
  SpinnerComponent,
];
