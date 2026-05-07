import { Type } from '@angular/core';
import { BottoniSquadreComponent } from '../components/bottoni-squadre.component';
import { ChartsComponent } from '../components/charts.component';
import { ListaSquadreComponent } from '../components/lista-squadre.component';
import { SpinnerComponent } from '../../../../../../../../../library/components/spinner/spinner.component';
import { IconeListaComponent } from '../../../../../../../../shared/components/custom/icone-lista.component';
import { TabellaCustomComponent } from '../../../../../../../../../library/components/table/table.component';

export const punteggi_imports: Type<any>[] = [
  ListaSquadreComponent,
  ChartsComponent,
  BottoniSquadreComponent,
  SpinnerComponent,
  IconeListaComponent,
  TabellaCustomComponent,
];
