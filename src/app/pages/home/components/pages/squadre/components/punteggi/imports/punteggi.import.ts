import { Type } from '@angular/core';
import { BottoniSquadreComponent } from '../components/bottoni-squadre.component';
import { ChartsComponent } from '../components/charts.component';
import { ListaSquadreComponent } from '../components/lista-squadre.component';
import { SpinnerComponent } from '../../../../../../../../shared/components/dialogs/spinner.component';

export const punteggi_imports: Type<any>[] = [
  ListaSquadreComponent,
  ChartsComponent,
  BottoniSquadreComponent,
  SpinnerComponent,
];
