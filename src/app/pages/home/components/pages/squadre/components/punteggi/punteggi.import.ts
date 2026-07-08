import { Type } from '@angular/core';
import { SpinnerIndyComponent } from '../../../../../../../../library/components/spinner/spinner-indy.component';
import { TabellaIndyComponent } from '../../../../../../../../library/components/table/table-indy.component';
import { BottoniSquadreComponent } from './components/bottoni-squadre.component';
import { ChartsComponent } from './components/charts.component';
import { ListaSquadreComponent } from './components/lista-squadre.component';
import { TabsIndyComponent } from '../../../../../../../../library/components/tabs/tabs-indy.component';

export const punteggi_imports: Type<any>[] = [
  ListaSquadreComponent,
  ChartsComponent,
  BottoniSquadreComponent,
  SpinnerIndyComponent,
  TabellaIndyComponent,
  TabsIndyComponent,
];
