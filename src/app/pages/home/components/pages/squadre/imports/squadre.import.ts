import { Type } from '@angular/core';
import { ErrorHttpComponent } from '../../../../../../shared/components/custom/errorhttp.component';
import { CustomNavBarComponent } from '../../../../../../shared/components/custom/navbar-custom.component';
import { ChartsPrintComponent } from '../components/charts-print.component';
import { MNComponent } from '../components/m-n/m-n.component';
import { MappaSquadreComponent } from '../components/mappa-squadre.component';
import { PunteggiComponent } from '../components/punteggi/punteggi.component';

export const squadreimports: Type<any>[] = [
  ChartsPrintComponent,
  ErrorHttpComponent,
  MappaSquadreComponent,
  CustomNavBarComponent,
  MNComponent,
  PunteggiComponent,
];
