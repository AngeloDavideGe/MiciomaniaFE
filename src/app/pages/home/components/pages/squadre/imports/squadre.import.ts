import { Type } from '@angular/core';
import { CustomNavBarComponent } from '../../../../../../../library/components/navbar/navbar.component';
import { ChartsPrintComponent } from '../components/charts-print.component';
import { MNComponent } from '../components/m-n/m-n.component';
import { MappaSquadreComponent } from '../components/mappa-squadre.component';
import { PunteggiComponent } from '../components/punteggi/punteggi.component';

export const squadre_imports: Type<any>[] = [
  ChartsPrintComponent,
  MappaSquadreComponent,
  CustomNavBarComponent,
  MNComponent,
  PunteggiComponent,
];
