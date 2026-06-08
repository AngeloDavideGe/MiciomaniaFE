import { Type } from '@angular/core';
import { SpinnerComponent } from '../../../../../../../../../library/components/spinner/spinner.component';
import { TabellaCustomComponent } from '../../../../../../../../../library/components/table/table.component';
import { BottoniSquadreComponent } from '../components/bottoni-squadre.component';
import { ChartsComponent } from '../components/charts.component';
import { ListaSquadreComponent } from '../components/lista-squadre.component';
import { TabsComponent } from '../../../../../../../../../library/components/tabs/tabs.component';

export const punteggi_imports: Type<any>[] = [
  ListaSquadreComponent,
  ChartsComponent,
  BottoniSquadreComponent,
  SpinnerComponent,
  TabellaCustomComponent,
  TabsComponent,
];
