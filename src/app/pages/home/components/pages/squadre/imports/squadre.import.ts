import { Type } from '@angular/core';
import { BottoniSquadreComponent } from '../components/bottoni-squadre.component';
import { ChartsPrintComponent } from '../components/charts-print.component';
import { ChartsComponent } from '../components/charts.component';
import { ListaSquadreComponent } from '../components/lista-squadre.component';
import { ErrorHttpComponent } from '../../../../../../shared/components/custom/errorhttp.component';

export const squadreimports: Type<any>[] = [
  ListaSquadreComponent,
  BottoniSquadreComponent,
  ChartsComponent,
  ChartsPrintComponent,
  ErrorHttpComponent,
];
