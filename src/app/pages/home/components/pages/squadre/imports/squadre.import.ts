import { Type } from '@angular/core';
import { BottoniSquadreComponent } from '../components/bottoni-squadre.component';
import { ChartsPrintComponent } from '../components/charts-print.component';
import { ChartsComponent } from '../components/charts.component';
import { ListaSquadreComponent } from '../components/lista-squadre.component';
import { ErrorHttpComponent } from '../../../../../../shared/components/custom/errorhttp.component';
import { MappaSquadreComponent } from '../components/mappa-squadre.component';
import { CustomNavBarComponent } from '../../../../../../shared/components/custom/navbar-custom.component';
import { MNComponent } from '../components/m-n/m-n.component';

export const squadreimports: Type<any>[] = [
  ListaSquadreComponent,
  BottoniSquadreComponent,
  ChartsComponent,
  ChartsPrintComponent,
  ErrorHttpComponent,
  MappaSquadreComponent,
  CustomNavBarComponent,
  MNComponent,
];
