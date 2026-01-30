import { Type } from '@angular/core';
import { BottoniSquadreComponent } from '../components/bottoni-squadre.component';
import { ChartsComponent } from '../components/charts.component';
import { ListaSquadreComponent } from '../components/lista-squadre.component';

export const punteggi_imports: Type<any>[] = [
  ListaSquadreComponent,
  ChartsComponent,
  BottoniSquadreComponent,
];
