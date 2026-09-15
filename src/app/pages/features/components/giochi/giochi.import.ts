import { Type } from '@angular/core';
import { ContaierMicioComponent } from '../../../../shared/components/container-micio.component';
import { DescrizioneMicioComponent } from '../../../../shared/components/descrizione-micio.component';
import { ToolbarMicioComponent } from '../../../../shared/components/toolbar-micio.component';
import { SidebarIndyComponent } from '../../../../../library/components/sidebar/sidebar-indy.component';
import { SpinnerIndyComponent } from '../../../../../library/components/spinner/spinner-indy.component';
import { CardIndyComponent } from '../../../../../library/components/card/card-indy.component';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';

export const giochi_imports: Type<any>[] = [
  ContaierMicioComponent,
  DescrizioneMicioComponent,
  ToolbarMicioComponent,
  SidebarIndyComponent,
  SpinnerIndyComponent,
  CardIndyComponent,
  RouterOutlet,
  AsyncPipe,
];
