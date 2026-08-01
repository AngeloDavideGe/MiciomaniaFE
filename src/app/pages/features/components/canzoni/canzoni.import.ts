import { Type } from '@angular/core';
import { ContaierMicioComponent } from '../../../../shared/components/container-micio.component';
import { DescrizioneMicioComponent } from '../../../../shared/components/descrizione-micio.component';
import { ToolbarMicioComponent } from '../../../../shared/components/toolbar-micio.component';
import { SidebarIndyComponent } from '../../../../../library/components/sidebar/sidebar-indy.component';
import { SpinnerIndyComponent } from '../../../../../library/components/spinner/spinner-indy.component';
import { CardIndyComponent } from '../../../../../library/components/card/card-indy.component';

export const canzoni_imports: Type<any>[] = [
  ContaierMicioComponent,
  DescrizioneMicioComponent,
  ToolbarMicioComponent,
  SidebarIndyComponent,
  SpinnerIndyComponent,
  CardIndyComponent,
];
