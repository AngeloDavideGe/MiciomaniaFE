import { Type } from '@angular/core';
import { BottoniSquadreComponent } from '../components/bottoni-squadre.component';
import { ChartsComponent } from '../components/charts.component';
import { ListaSquadreComponent } from '../components/lista-squadre.component';
import { SpinnerComponent } from '../../../../../../../../shared/components/dialogs/spinner.component';
import { IconeListaComponent } from '../../../../../../../../shared/components/custom/icone-lista.component';
import { TabellaCustomComponent } from '../../../../../../../../shared/components/custom/tabella-custom.component';

export const punteggi_imports: Type<any>[] = [
  ListaSquadreComponent,
  ChartsComponent,
  BottoniSquadreComponent,
  SpinnerComponent,
  IconeListaComponent,
  TabellaCustomComponent,
];
